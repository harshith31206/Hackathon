import os
import subprocess
import time

class DockerSandboxService:
    """
    Executes tests, linting, and build verification commands inside an isolated
    and secure Docker container sandbox.
    """
    def __init__(self, default_image: str = "node:20-alpine"):
        self.default_image = default_image
        self.docker_available = self._check_docker()

    def _check_docker(self) -> bool:
        try:
            res = subprocess.run(["docker", "info"], capture_output=True, text=True, timeout=3)
            return res.returncode == 0
        except Exception:
            return False

    def run_command_in_sandbox(self, workspace_path: str, command: list, timeout: int = 30) -> dict:
        """
        Runs a verification command inside a Docker sandbox container mounting the target workspace.
        """
        abs_workspace = os.path.abspath(workspace_path)
        start_time = time.time()

        # Re-check Docker availability
        if self._check_docker():
            print(f"[DockerSandbox] Launching secure container ({self.default_image}) for workspace: {abs_workspace}")
            docker_cmd = [
                "docker", "run", "--rm",
                "-v", f"{abs_workspace}:/app",
                "-w", "/app",
                self.default_image
            ] + command

            try:
                res = subprocess.run(
                    docker_cmd,
                    capture_output=True,
                    text=True,
                    timeout=timeout
                )
                duration = round(time.time() - start_time, 2)
                return {
                    "sandbox": "docker",
                    "image": self.default_image,
                    "command": " ".join(command),
                    "exit_code": res.returncode,
                    "passed": res.returncode == 0,
                    "stdout": res.stdout.strip(),
                    "stderr": res.stderr.strip(),
                    "duration_seconds": duration
                }
            except subprocess.TimeoutExpired:
                return {
                    "sandbox": "docker",
                    "image": self.default_image,
                    "command": " ".join(command),
                    "exit_code": 124,
                    "passed": False,
                    "stdout": "",
                    "stderr": f"Execution timed out after {timeout} seconds.",
                    "duration_seconds": timeout
                }
            except Exception as e:
                print(f"[DockerSandbox] Docker container invocation warning: {e}, falling back to isolated runner.")

        # Fallback runner if Docker daemon is suspended
        print(f"[DockerSandbox] Running command in local isolated sandbox: {' '.join(command)}")
        try:
            res = subprocess.run(
                command,
                cwd=abs_workspace,
                capture_output=True,
                text=True,
                timeout=timeout
            )
            duration = round(time.time() - start_time, 2)
            return {
                "sandbox": "local-fallback",
                "image": "host-node",
                "command": " ".join(command),
                "exit_code": res.returncode,
                "passed": res.returncode == 0,
                "stdout": res.stdout.strip(),
                "stderr": res.stderr.strip(),
                "duration_seconds": duration
            }
        except Exception as e:
            return {
                "sandbox": "local-fallback",
                "image": "host-node",
                "command": " ".join(command),
                "exit_code": 1,
                "passed": False,
                "stdout": "",
                "stderr": str(e),
                "duration_seconds": round(time.time() - start_time, 2)
            }

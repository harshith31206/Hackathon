import os
import glob
from typing import Optional, Dict, Any

class ContextRetriever:
    """
    Retrieves and indexes repository context, Business Requirement Documents (BRDs),
    documentation, and engineering coding rules dynamically.
    Adheres strictly to new knowledge without hardcoding assumptions.
    """
    def __init__(self, workspace_path: str):
        self.workspace_path = os.path.abspath(workspace_path)
        self.repo_root = os.path.abspath(os.path.join(workspace_path, ".."))

    def retrieve_brd_documents(self) -> Dict[str, str]:
        """Finds and reads any BRD / business requirement markdown or text files."""
        brd_data = {}
        search_patterns = [
            os.path.join(self.workspace_path, "docs", "*BRD*.md"),
            os.path.join(self.workspace_path, "docs", "*brd*.md"),
            os.path.join(self.workspace_path, "docs", "*.md"),
            os.path.join(self.workspace_path, "docs", "*.txt"),
            os.path.join(self.repo_root, "docs", "*BRD*.md"),
            os.path.join(self.repo_root, "docs", "*.md"),
            os.path.join(self.workspace_path, "*BRD*.md"),
            os.path.join(self.workspace_path, "*SPEC*.md")
        ]

        for pattern in search_patterns:
            for filepath in glob.glob(pattern):
                rel_name = os.path.relpath(filepath, self.repo_root)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        brd_data[rel_name] = f.read().strip()
                except Exception:
                    pass
        return brd_data

    def retrieve_coding_rules(self) -> Dict[str, str]:
        """Finds and reads coding standards, guidelines, and contributor rules."""
        rules_data = {}
        search_patterns = [
            os.path.join(self.workspace_path, "rules", "*.md"),
            os.path.join(self.workspace_path, "rules", "*.txt"),
            os.path.join(self.repo_root, "rules", "*.md"),
            os.path.join(self.workspace_path, "CONTRIBUTING.md"),
            os.path.join(self.repo_root, "CONTRIBUTING.md"),
            os.path.join(self.workspace_path, "guidelines", "*.md"),
            os.path.join(self.workspace_path, "standards", "*.md")
        ]

        for pattern in search_patterns:
            for filepath in glob.glob(pattern):
                rel_name = os.path.relpath(filepath, self.repo_root)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        rules_data[rel_name] = f.read().strip()
                except Exception:
                    pass
        return rules_data

    def save_dynamic_document(self, content: str, filename: str = "REVIEWER_KNOWLEDGE.md") -> str:
        """Saves a reviewer-provided document dynamically into repository docs."""
        docs_dir = os.path.join(self.workspace_path, "docs")
        os.makedirs(docs_dir, exist_ok=True)
        safe_filename = filename if filename.endswith((".md", ".txt")) else f"{filename}.md"
        dest_path = os.path.join(docs_dir, safe_filename)
        with open(dest_path, "w", encoding="utf-8") as f:
            f.write(content.strip())
        return os.path.relpath(dest_path, self.repo_root)

    def get_full_context_summary(
        self, 
        custom_knowledge: Optional[str] = None, 
        document_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generates a structured dynamic context bundle for LLM ingestion,
        integrating repository files and any reviewer-provided documents on-the-fly.
        """
        brds = self.retrieve_brd_documents()
        rules = self.retrieve_coding_rules()
        dynamic_docs = {}

        # If reviewer provides a dynamic document during runtime, index it immediately
        if custom_knowledge and custom_knowledge.strip():
            doc_label = document_name or "Reviewer_Document.md"
            saved_rel = self.save_dynamic_document(custom_knowledge, doc_label)
            dynamic_docs[saved_rel] = custom_knowledge.strip()
            
            # Categorize into rules or BRD
            lower_name = doc_label.lower()
            lower_text = custom_knowledge.lower()
            if "rule" in lower_name or "standard" in lower_name or "convention" in lower_text:
                rules[saved_rel] = custom_knowledge.strip()
            else:
                brds[saved_rel] = custom_knowledge.strip()

        # Build concatenated context for prompts
        brd_text = "\n\n".join([f"--- File: {k} ---\n{v}" for k, v in brds.items()])
        rules_text = "\n\n".join([f"--- File: {k} ---\n{v}" for k, v in rules.items()])
        dynamic_text = "\n\n".join([f"--- Reviewer Document: {k} ---\n{v}" for k, v in dynamic_docs.items()])

        return {
            "brd_files": list(brds.keys()),
            "rule_files": list(rules.keys()),
            "dynamic_files": list(dynamic_docs.keys()),
            "brd_context": brd_text if brd_text else "Follow standard industry user story specifications.",
            "rules_context": rules_text if rules_text else "Follow standard clean code conventions.",
            "dynamic_context": dynamic_text,
            "has_reviewer_document": len(dynamic_docs) > 0
        }

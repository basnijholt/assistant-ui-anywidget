# Vector Database Integration Plan ❌ (Not Implemented)

**Status:** This feature is planned but not yet implemented. This document describes the future architecture for integrating a local vector database to enhance the AI assistant with documentation search capabilities.

## Overview

This document outlines the plan for integrating a local vector database to index and search documentation for Python packages used in Jupyter notebooks. This will enhance the AI assistant's ability to provide accurate, context-aware help.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Jupyter Environment                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐        ┌────────────────────────────┐   │
│  │  AgentWidget     │◄──────►│  Vector Database Service   │   │
│  │                  │        │                            │   │
│  │  - Query docs    │        │  - Document indexing       │   │
│  │  - Get context   │        │  - Similarity search       │   │
│  │  - Update index  │        │  - Embeddings generation   │   │
│  └──────────────────┘        └──────────┬───────────────┘   │
│                                          │                     │
│                                          ▼                     │
│                              ┌─────────────────────┐          │
│                              │  Local Vector DB    │          │
│                              │  (ChromaDB       )  │          │
│                              └─────────────────────┘          │
│                                          │                     │
│                                          ▼                     │
│                              ┌─────────────────────┐          │
│                              │  Documentation      │          │
│                              │  Sources            │          │
│                              │  - PyPI packages    │          │
│                              │  - GitHub repos     │          │
│                              │  - Local docs       │          │
│                              └─────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Vector Database Options

#### ChromaDB (Recommended)

```python
# Pros:
- Lightweight, embedded database
- Python-native, easy integration
- Good performance for small-medium datasets
- Built-in embedding functions
- Simple API

# Cons:
- Limited scalability
- Fewer advanced features
```

### Embedding Model Options

1. **Sentence Transformers** (Recommended)
   - Model: `all-MiniLM-L6-v2` (384 dimensions)
   - Fast, accurate, small size
   - Good for code and documentation

2. **OpenAI Embeddings**
   - Model: `text-embedding-ada-002`
   - High quality but requires API key
   - Better for natural language

3. **Local Transformer Models**
   - Custom fine-tuned models
   - Domain-specific performance

## Implementation Design

### 1. Document Indexing Service

```python
from dataclasses import dataclass
from typing import List, Dict, Optional
import chromadb
from sentence_transformers import SentenceTransformer

@dataclass
class Document:
    id: str
    content: str
    metadata: Dict[str, any]
    source: str
    package: str
    version: str
    doc_type: str  # 'api', 'tutorial', 'example', 'concept'

class DocumentIndexer:
    """Service for indexing documentation into vector database."""

    def __init__(self, db_path: str = "./vector_db"):
        self.client = chromadb.PersistentClient(path=db_path)
        self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        self.collection = self.client.get_or_create_collection(
            name="documentation",
            metadata={"hnsw:space": "cosine"}
        )

    def index_package(self, package_name: str) -> int:
        """Index documentation for a Python package."""
        # 1. Fetch documentation
        docs = self.fetch_documentation(package_name)

        # 2. Process and chunk documents
        chunks = self.chunk_documents(docs)

        # 3. Generate embeddings
        embeddings = self.embedder.encode([c.content for c in chunks])

        # 4. Store in vector database
        self.collection.add(
            embeddings=embeddings,
            documents=[c.content for c in chunks],
            metadatas=[c.metadata for c in chunks],
            ids=[c.id for c in chunks]
        )

        return len(chunks)

    def chunk_documents(self, docs: List[Document]) -> List[Document]:
        """Split documents into semantic chunks."""
        # Smart chunking based on:
        # - Code blocks
        # - Sections/headers
        # - Paragraph boundaries
        # - Max token limits
```

### 2. Documentation Fetcher

```python
class DocumentationFetcher:
    """Fetch documentation from various sources."""

    def fetch_from_pypi(self, package: str) -> List[Document]:
        """Fetch docs from PyPI/ReadTheDocs."""

    def fetch_from_github(self, repo_url: str) -> List[Document]:
        """Fetch docs from GitHub repositories."""

    def fetch_from_local(self, path: str) -> List[Document]:
        """Index local documentation files."""

    def parse_sphinx_docs(self, html_content: str) -> List[Document]:
        """Parse Sphinx-generated documentation."""

    def parse_markdown_docs(self, md_content: str) -> List[Document]:
        """Parse Markdown documentation."""
```

### 3. Search and Retrieval

```python
class DocumentationSearch:
    """Search indexed documentation."""

    def __init__(self, db_path: str = "./vector_db"):
        self.client = chromadb.PersistentClient(path=db_path)
        self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        self.collection = self.client.get_collection("documentation")

    def search(
        self,
        query: str,
        package_filter: Optional[List[str]] = None,
        doc_type_filter: Optional[List[str]] = None,
        n_results: int = 5
    ) -> List[SearchResult]:
        """Search for relevant documentation."""

        # Generate query embedding
        query_embedding = self.embedder.encode([query])

        # Build filters
        where = {}
        if package_filter:
            where["package"] = {"$in": package_filter}
        if doc_type_filter:
            where["doc_type"] = {"$in": doc_type_filter}

        # Search
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=n_results,
            where=where if where else None
        )

        return self._format_results(results)

    def search_with_context(
        self,
        query: str,
        code_context: str,
        variables: Dict[str, str]
    ) -> List[SearchResult]:
        """Search with additional context from kernel."""

        # Enhance query with context
        enhanced_query = self._build_contextual_query(
            query, code_context, variables
        )

        return self.search(enhanced_query)
```

### 4. Integration with AgentWidget

```python
class EnhancedAgentWidget(AgentWidget):
    """AgentWidget with vector database integration."""

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.doc_search = DocumentationSearch()
        self.doc_indexer = DocumentIndexer()

        # Auto-index imported packages
        self._index_imported_packages()

    def _handle_message(self, widget, content, buffers=None):
        """Enhanced message handler with documentation search."""

        if content.get("type") == "user_message":
            user_text = content.get("text", "")

            # Check if documentation is needed
            if self._needs_documentation(user_text):
                # Get relevant context
                context = self._get_kernel_context()

                # Search documentation
                docs = self.doc_search.search_with_context(
                    user_text,
                    context["code"],
                    context["variables"]
                )

                # Enhance AI response with documentation
                enhanced_context = {
                    **context,
                    "documentation": docs
                }

                # Process with AI
                response = self.ai_assistant.process(
                    user_text,
                    enhanced_context
                )
            else:
                # Normal processing
                response = self.ai_assistant.process(user_text)

    def index_package(self, package_name: str):
        """Manually index a package's documentation."""
        count = self.doc_indexer.index_package(package_name)
        self.add_message(
            "system",
            f"Indexed {count} documentation chunks for {package_name}"
        )
```

## Data Sources

### 1. Primary Sources

- **PyPI**: Package metadata and links
- **ReadTheDocs**: Hosted documentation
- **GitHub**: README, docs folders, wikis
- **Package Source**: Docstrings, type hints

### 2. Documentation Types

- **API Reference**: Functions, classes, methods
- **Tutorials**: Step-by-step guides
- **Examples**: Code snippets, notebooks
- **Concepts**: Theory, best practices

### 3. Metadata Schema

```python
metadata = {
    "package": "pandas",
    "version": "2.0.0",
    "source": "readthedocs",
    "doc_type": "api",
    "function": "DataFrame.merge",
    "url": "https://...",
    "last_updated": "2024-01-01",
    "language": "python",
    "framework": "data-analysis"
}
```

## Indexing Strategy

### 1. Initial Indexing

```python
# On first use, index common packages
DEFAULT_PACKAGES = [
    "numpy", "pandas", "matplotlib",
    "requests", "scikit-learn", "tensorflow"
]

# Auto-detect and index imported packages
def auto_index_imports():
    imports = detect_imports_in_notebook()
    for package in imports:
        if not is_indexed(package):
            index_package(package)
```

### 2. Incremental Updates

- Check package versions
- Update only changed documentation
- Background indexing process
- User-triggered updates

### 3. Storage Management

- Configurable storage limits
- LRU cache for embeddings
- Compression for text content
- Periodic cleanup

## Query Enhancement

### 1. Context-Aware Queries

```python
def enhance_query_with_context(query: str, context: dict) -> str:
    """Enhance user query with kernel context."""

    # Add variable types
    if "df" in query and "df" in context["variables"]:
        query += f" [df is pandas.DataFrame]"

    # Add error context
    if context.get("last_error"):
        query += f" [Error: {context['last_error']['type']}]"

    # Add code context
    if context.get("current_code"):
        query += f" [Code: {context['current_code'][:100]}]"

    return query
```

### 2. Query Expansion

- Synonym expansion
- Related term inclusion
- Package-specific terminology
- Common abbreviations

## Performance Optimization

### 1. Caching Strategy

```python
class CachedDocumentationSearch:
    def __init__(self):
        self.cache = LRUCache(maxsize=1000)
        self.embedding_cache = LRUCache(maxsize=5000)

    @cached(cache=self.cache)
    def search(self, query: str) -> List[SearchResult]:
        # Check cache first
        if query in self.cache:
            return self.cache[query]
```

### 2. Batch Processing

- Batch embedding generation
- Parallel document fetching
- Async indexing operations

### 3. Resource Management

- Memory limits for embeddings
- Disk space monitoring
- CPU usage throttling

## Privacy and Security

### 1. Local-Only Processing

- All data stored locally
- No external API calls for search
- User control over indexing

### 2. Data Isolation

- Per-project databases
- User-specific collections
- No cross-contamination

### 3. Sensitive Data

- Exclude private repositories
- Filter credentials/secrets
- Configurable exclusions

## User Interface Integration

### 1. Documentation Panel

```typescript
interface DocumentationPanelProps {
  searchResults: DocumentationResult[];
  onIndexPackage: (package: string) => void;
  indexedPackages: string[];
}
```

### 2. Search Interface

- Inline documentation preview
- Source attribution
- Version information
- Direct links to full docs

### 3. Management UI

- Package indexing status
- Storage usage visualization
- Update scheduling
- Search statistics

## Testing Strategy

### 1. Unit Tests

```python
def test_document_chunking():
    """Test document chunking logic."""

def test_embedding_generation():
    """Test embedding consistency."""

def test_search_relevance():
    """Test search result quality."""
```

### 2. Integration Tests

- End-to-end indexing
- Search accuracy
- Performance benchmarks
- Memory usage tests

### 3. Quality Metrics

- Search relevance scoring
- Response time measurement
- Index coverage analysis
- User satisfaction tracking

## Implementation Timeline

### Phase 1: Core Infrastructure (Week 1-2)

- [ ] Set up ChromaDB
- [ ] Implement basic indexing
- [ ] Create search interface
- [ ] Basic UI integration

### Phase 2: Documentation Sources (Week 3-4)

- [ ] PyPI integration
- [ ] GitHub fetcher
- [ ] Sphinx parser
- [ ] Markdown processor

### Phase 3: Smart Features (Week 5-6)

- [ ] Context-aware search
- [ ] Query enhancement
- [ ] Auto-indexing
- [ ] Caching layer

### Phase 4: Polish (Week 7-8)

- [ ] Performance optimization
- [ ] UI improvements
- [ ] Testing suite
- [ ] Documentation

## Success Metrics

1. **Search Quality**
   - Relevance score > 0.8
   - Top-5 accuracy > 90%
   - User satisfaction > 4/5

2. **Performance**
   - Search latency < 100ms
   - Indexing speed > 1000 docs/min
   - Memory usage < 500MB

3. **Coverage**
   - Top 100 packages indexed
   - > 80% API coverage
   - Multiple doc types

## Future Enhancements

### Version 2.0

- Multi-language support
- Cloud synchronization
- Collaborative indexing
- Custom embeddings

### Version 3.0

- Code example execution
- Interactive tutorials
- Video documentation
- AI-generated summaries

## Conclusion

This vector database integration will significantly enhance the AI assistant's ability to provide accurate, contextual help by leveraging indexed documentation. The local-first approach ensures privacy while maintaining high performance and relevance.

-- Initialize Database Schema

CREATE TABLE IF NOT EXISTS commits (
    id SERIAL PRIMARY KEY,
    sha VARCHAR(255) UNIQUE NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    message TEXT,
    commit_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index on author for faster aggregation
CREATE INDEX IF NOT EXISTS idx_commits_author ON commits(author_name, author_email);

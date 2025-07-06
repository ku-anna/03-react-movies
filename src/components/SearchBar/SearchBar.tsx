import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  action: (query: string) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleAction = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      toast.error("Please enter your search query.");
      return;
    }
    action(trimmed);
    setQuery("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form
          className={styles.form}
          action={(e: unknown) => {
            e instanceof Event && e.preventDefault();
            handleAction();
          }}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            aria-label="Search movies"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import styles from "../index.style";
import { Box } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleSearchClick = () => {
    setExpanded(true);
  };

  const handleSearchBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!searchRef.current?.contains(event.relatedTarget as Node)) {
      setExpanded(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <Box sx={styles.searchContainer(theme)}>
      <Box sx={styles.search(theme, expanded)} ref={searchRef}>
        <Box sx={styles.searchIconWrapper(theme)}>
          <Box
            component="img"
            alt="i"
            src="/icons/search_icon.svg"
            width={30}
          />
        </Box>
        <InputBase
          placeholder="Search your tasks..."
          inputProps={{ "aria-label": "search" }}
          sx={{
            ...styles.inputRoot(theme),
            "& .MuiInputBase-input": styles.inputInput(theme, expanded),
          }}
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleSearchClick}
          onBlur={handleSearchBlur}
        />
      </Box>
    </Box>
  );
}

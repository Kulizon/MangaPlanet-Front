import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { searchActions, SearchStateInterface } from "../../../store/search";
import { useNavigate, useLocation } from "react-router";

import styles from "./SearchBox.module.scss";

import Input from "../../UI/Forms/Input/Input";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<any>();
  const receivedQuery = useSelector((state: { search: SearchStateInterface }) => state.search.query);

  const navigate = useNavigate();
  const location = useLocation();

  // sets query and isSearching
  const searchHandler = (e: any) => {
    setQuery(e.target.value);
    setIsSearching(true);
  };

  // clears query, input value and isSearching
  const clearInputHandler = () => {
    setQuery("");
    setIsSearching(false);
    inputRef.current.value = "";
  };

  // after a short delay, user stops searching
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  // when a different component dispatches action - clear query
  useEffect(() => {
    if (!receivedQuery) setQuery("");
  }, [receivedQuery]);

  // manage url based on query and isSearching
  useEffect(() => {
    if (!query && !isSearching && location.pathname === "/search") navigate("/");

    if (isSearching || query) navigate("/search");
  }, [isSearching, query, navigate, location.pathname]);

  // dispatch action to other components
  useEffect(() => {
    dispatch(searchActions.setQuery(query));
    dispatch(searchActions.setIsSearching(isSearching));
  }, [query, isSearching, dispatch]);

  return (
    <div className={styles["search-box"]}>
      <Input type="text" placeholder="Search..." onChange={searchHandler} inputRef={inputRef} />
      <i className="fa-solid fa-magnifying-glass"></i>
      <i className="fa-solid fa-xmark" onClick={clearInputHandler}></i>
    </div>
  );
};

export default SearchBox;

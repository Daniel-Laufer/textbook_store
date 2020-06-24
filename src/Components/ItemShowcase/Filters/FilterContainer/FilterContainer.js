import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { FormControl, Form } from "react-bootstrap";

import "./FilterContainer.css";
import {
  updateFilters,
  updateSearch,
} from "../../../../Redux/Actions/searchActions";
import { searchAndUpdateTextbooks } from "../../../../Redux/Actions/textbookActions";

const courses = [
  { value: "csc148", label: "CSC148" },
  { value: "soc100", label: "SOC100" },
  { value: "mat136", label: "MAT136" },
  { value: "mat102", label: "MAT102" },
  { value: "phy100", label: "PHY100" },
];

const campuses = [
  { value: "utm", label: "UTM" },
  { value: "utsg", label: "UTSG" },
  { value: "utsc", label: "UTSC" },
];

const FilterContainer = ({
  search,
  updateFilters,
  updateSearch,
  searchAndUpdateTextbooks,
}) => {
  const [courseFilter, setCourseFilter] = useState(null);
  const [campusFilter, setCampusFilter] = useState(null);

  useEffect(() => {
    updateFilters({ course: courseFilter, campus: campusFilter });
  }, [courseFilter, campusFilter, updateFilters]);

  useEffect(() => {
    searchAndUpdateTextbooks(search.searchTerm, search.filters);
  }, [search.searchTerm, search.filters, searchAndUpdateTextbooks]);

  const handleFilterChange = (item, type) => {
    switch (type) {
      case "course":
        setCourseFilter(item ? item.value.toUpperCase() : null);
        break;
      case "campus":
        setCampusFilter(item ? item.value.toUpperCase() : null);
        break;
      default:
        console.log("error!");
    }
  };

  return (
    <>
      <div className="filter-container">
        <Select
          placeholder="Course"
          onChange={(item) => handleFilterChange(item, "course")}
          isClearable={true}
          className="select"
          options={courses}
        />
        <Select
          placeholder="Campus"
          onChange={(item) => handleFilterChange(item, "campus")}
          isClearable={true}
          className="select"
          options={campuses}
        />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          inline
        >
          <FormControl
            id="search-bar"
            type="text"
            onChange={(e) => {
              updateSearch(e.target.value);
            }}
            placeholder="Search for a title"
            className="mr-sm-2"
          />
        </Form>
      </div>

      <hr />
      {/* <p>{'Displaying results for:'}  <strong><em>{(search.searchTerm ? `|    Quick Search: ${search.searchTerm}    |` : '') + (courseFilter ? `|    Course: ${courseFilter}    |` : '') + (campusFilter ? `|    Campus: ${campusFilter}    |` : '')}</em></strong></p> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.searchReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilters: (filters) => dispatch(updateFilters(filters)),
    updateSearch: (searchTerm) => dispatch(updateSearch(searchTerm)),
    searchAndUpdateTextbooks: (searchTerm, filters) =>
      dispatch(searchAndUpdateTextbooks(searchTerm, filters)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);

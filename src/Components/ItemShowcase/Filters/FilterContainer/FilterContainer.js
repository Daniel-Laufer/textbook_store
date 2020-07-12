import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { FormControl, Form } from "react-bootstrap";
import courseData from "./courseData";

import "./FilterContainer.css";
import {
  updateFilters,
  updateSearch,
} from "../../../../Redux/Actions/searchActions";
import { searchAndUpdateTextbooks } from "../../../../Redux/Actions/textbookActions";

// let courses = [
//   { value: "csc148", label: "CSC148" },
//   { value: "soc100", label: "SOC100" },
//   { value: "mat136", label: "MAT136" },
//   { value: "mat102", label: "MAT102" },
//   { value: "phy100", label: "PHY100" },
// ];

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
  settings,
}) => {
  const [courseFilter, setCourseFilter] = useState(null);
  const [campusFilter, setCampusFilter] = useState(null);
  const [coursePrefixFilter, setCoursePrefixFilter] = useState(null);

  const [courses, setCourses] = useState({});
  const [coursePrefixes, setCoursePrefixes] = useState({});

  useEffect(() => {
    updateFilters({
      course: courseFilter,
      campus: campusFilter,
      coursePrefix: coursePrefixFilter,
    });
  }, [courseFilter, campusFilter, coursePrefixFilter, updateFilters]);

  // filter out the unecessary courses
  useEffect(() => {
    if (coursePrefixFilter) {
      let courses = [];
      for (let i = 0; i < courseData.courses.length; i++) {
        let course = courseData.courses[i];
        let upperCaseCourse = course.toUpperCase();
        if (upperCaseCourse.startsWith(coursePrefixFilter)) {
          let toAppend = {
            value: course.toLowerCase(),
            label: upperCaseCourse,
          };
          courses.push(toAppend);
        }
      }
      setCourses(courses);
    } else {
      setCourses(null);
    }
  }, [coursePrefixFilter]);

  useEffect(() => {
    searchAndUpdateTextbooks(search.searchTerm, search.filters);
  }, [search.searchTerm, search.filters, searchAndUpdateTextbooks]);

  useEffect(() => {
    setCourses({});

    let coursePrefixes = [];
    for (let i = 0; i < courseData.coursePrefixes.length; i++) {
      let course = courseData.coursePrefixes[i];
      let toAppend = {
        value: course.toLowerCase(),
        label: course.toUpperCase(),
      };
      coursePrefixes.push(toAppend);
    }
    setCoursePrefixes(coursePrefixes);
  }, []);

  const handleFilterChange = (item, type) => {
    switch (type) {
      case "course":
        setCourseFilter(item ? item.value.toUpperCase() : null);
        break;
      case "campus":
        setCampusFilter(item ? item.value.toUpperCase() : null);
        break;
      case "coursePrefix":
        if (!item) {
          setCourseFilter(null);
        }
        setCoursePrefixFilter(item ? item.value.toUpperCase() : null);

        break;
      default:
        return null;
    }

  };

  return (
    <>
      <div
        className="filter-container"
        style={{
          backgroundColor: settings.settings.darkTheme
            ? "rgb(56,56,56)"
            : "rgb(255,255,255)",
        }}
      >
        <Select
          placeholder="Department"
          value={
            coursePrefixFilter
              ? { value: coursePrefixFilter, label: coursePrefixFilter }
              : null
          }
          onChange={(item) => handleFilterChange(item, "coursePrefix")}
          isClearable={true}
          className="select"
          options={coursePrefixes}
        />
        <Select
          isDisabled={coursePrefixFilter ? false : true}
          placeholder="Course"
          value={
            courseFilter ? { value: courseFilter, label: courseFilter } : null
          }
          onChange={(item) => handleFilterChange(item, "course")}
          isClearable={true}
          className="select"
          options={courses}
        />
        <Select
          placeholder="Campus"
          value={
            campusFilter ? { value: campusFilter, label: campusFilter } : null
          }
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
            placeholder="Search by title"
            className="mr-sm-2"
          />
        </Form>
      </div>

      <hr style={{ color: "white" }} />
      {/* <p>{'Displaying results for:'}  <strong><em>{(search.searchTerm ? `|    Quick Search: ${search.searchTerm}    |` : '') + (courseFilter ? `|    Course: ${courseFilter}    |` : '') + (campusFilter ? `|    Campus: ${campusFilter}    |` : '')}</em></strong></p> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.searchReducer,
    settings: state.settingsReducer,
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

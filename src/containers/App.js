import React, { useEffect } from "react";
import CardList from "../components/CardList";
// import {robots} from './robots.js';
import SearchBox from "../components/SearchBox";
import "./app.css";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
// import Example from "../components/cobaHooks";
import { requestRobots, setSearchFilter } from "../actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    searchFilter: state.searchRobots.searchFilter,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchFilter(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};
function App(props) {
  // const [robots, setRobots] = useState([])
  // const [searchFilter, setSearchFilter] = useState('')
  const { searchFilter, onSearchChange, robots, isPending } = props;

  // const onSearchChange = (event) => {
  //     setSearchFilter(event.target.value);
  // }

  useEffect(() => {
    props.onRequestRobots();
  }, []);

  const filteredComponent = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchFilter.toLowerCase());
  });
  return isPending ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div className="tc">
        <h1 className="f1">My Fellow Friends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredComponent} />
          </ErrorBoundry>
        </Scroll>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

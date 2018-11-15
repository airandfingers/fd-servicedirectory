import React, { Component } from "react";
import api from "../core/api";
import { getSheetData, normalizeServices } from "../core/utils";
import { Link } from "react-router-dom";

class Categories extends Component {
  state = {
    isLoading: true,
    services: [],
  };

  async componentDidMount() {
    // Fetch the sheet  matching the service type id and pull out the values
    const res = await api.getSheetByTitle(this.props.match.params.typeId);
    const rawSheetData = getSheetData(res.data);
    const services = normalizeServices(rawSheetData);
    this.setState({
      isLoading: false,
      services,
    });
  }

  render() {
    const { services, isLoading } = this.state;
    const { match } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <article>
        <ul>
          {services.map(service => (
            <li key={service.id}>
              <Link to={`${match.url}/${service.id}`}>{service.name}</Link>
              <p>{service.address}</p>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}

export default Categories;
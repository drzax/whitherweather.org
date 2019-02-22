import React from "react";
import { format } from "date-fns";
import styles from "./styles.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.state = {
      content: localStorage.weatherReport || "",
      now: new Date(),
      location: localStorage.textLocation || null
    };
    this.handleLocationFocus = this.handleLocationFocus.bind(this);
    this.handleLocationBlur = this.handleLocationBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.contentRef.current.focus();
    this.contentRef.current.setSelectionRange(
      this.state.content.length,
      this.state.content.length
    );

    this.timerID = setInterval(() => this.setState({ now: new Date() }), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleChange(event) {
    localStorage.weatherReport = event.target.value;
    this.setState({ content: event.target.value });
  }

  handleLocationBlur(event) {
    const location = event.target.innerText;
    if (location.length === 0 || location === "an undisclosed location") {
      localStorage.textLocation = null;
      this.setState({ location: null });
    } else {
      localStorage.textLocation = location;
      this.setState({ location: location });
    }
  }

  handleLocationFocus(event) {
    console.log("focussed", !this.state.location);
    if (!this.state.location) {
      this.setState({ location: "" });
    }
  }

  handleSubmit(event) {
    alert("A weather was submitted: " + this.state.content);
    event.preventDefault();
  }

  render() {
    const { content, now, location } = this.state;
    return (
      <div className={styles.container}>
        <textarea
          ref={this.contentRef}
          className={styles.weather}
          value={content}
          placeholder="The weather here today is ..."
          onChange={this.handleChange}
        />
        <div className={styles.submitContainer}>
          <button onClick={this.handleSubmit} className={styles.submit}>
            Send report
          </button>
          <details>
            <summary>?</summary>
            <div className={styles.dialog}>
              <blockquote>
                <p>
                  A sorrowful sight I saw: dark night coming down prematurely,
                  and sky and hills mingled in one bitter whirl of wind and
                  suffocating snow.
                </p>
                <cite>Wuthering Heights by Emily Bronte</cite>
              </blockquote>
            </div>
          </details>
        </div>
        <section className={styles.meta}>
          <span>
            It's {format(now, "dddd h:mma")} in{" "}
            <span
              contentEditable
              onBlur={this.handleLocationBlur}
              onFocus={this.handleLocationFocus}
              onClick={this.getLocation}
              className={
                location ? styles.locationKnown : styles.locationUnknown
              }
            >
              {location ? location : "an undisclosed location"}
            </span>
            .
          </span>
        </section>
      </div>
    );
  }
}

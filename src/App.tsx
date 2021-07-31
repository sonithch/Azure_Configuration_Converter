import React from "react";

import "./styles.css";

interface AppState {
  selectedOption: string;
  inputData: string;
  outputData: string;
}

interface AzureConfig {
  name: string;
  value: string;
}

const Header = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <p
          style={{
            fontSize: "24px",
            fontWeight: 500,
            margin: 0
          }}
        >
          Azure Configuration Converter
        </p>
      </div>
    </div>
  );
};

class App extends React.Component<{}, AppState> {
  constructor(props: Object) {
    super(props);
    this.state = {
      selectedOption: "JSON",
      inputData: "",
      outputData: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onConvert = this.onConvert.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <div
          className="flex-row justify-content-center"
          style={{ padding: "10px" }}
        >
          <p>Choose Format:</p>
          <label onClick={this.onFormatChange}>
            <input
              type="radio"
              name="JSON"
              checked={this.state.selectedOption === "JSON"}
              value="JSON"
            />
            JSON
          </label>
          <label onClick={this.onFormatChange}>
            <input
              type="radio"
              name="CS"
              checked={this.state.selectedOption === "CS"}
              value="CS"
            />
            CS
          </label>
          <button
            className="button"
            style={{ marginLeft: "50px" }}
            onClick={this.onConvert}
          >
            Convert
          </button>
          <button
            style={{ marginLeft: "15px" }}
            className="alert button"
            onClick={() => this.setState({ inputData: "", outputData: "" })}
          >
            Clear
          </button>
          <button
            type="button"
            style={{ marginLeft: "15px" }}
            className="success button"
            onClick={this.onCopyToClipboard}
          >
            Copy to Clipboard
          </button>
        </div>

        <div className="row">
          <textarea
            placeholder="// Paste Azure Configuration JSON here"
            className="columns small-6"
            value={this.state.inputData}
            onChange={this.onInputChange}
          ></textarea>
          <textarea
            className="columns small-6"
            value={this.state.outputData}
            disabled={true}
          ></textarea>
        </div>
      </div>
    );
  }

  private onFormatChange(e: any) {
    this.setState({ selectedOption: e.target.value });
  }

  private onInputChange(e: any) {
    this.setState({
      inputData: e.target.value
    });
  }

  private onCopyToClipboard() {
    navigator.clipboard.writeText(this.state.outputData).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  private onConvert() {
    var inputData = JSON.parse(this.state.inputData);
    var outputData: any[] = [];

    inputData.map((item: AzureConfig) => {
      if (this.state.selectedOption === "JSON") {
        outputData.push(`"${item.name}": "${item.value}",`);
      } else {
        outputData.push(`<add key="${item.name}" value="${item.value}" />`);
      }
    });

    if (this.state.selectedOption === "JSON") {
      this.setState({ outputData: `{${outputData.join("\n")}}` });
    } else {
      this.setState({ outputData: outputData.join("\n") });
    }
  }
}

export default App;

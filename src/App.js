//import logo, { ReactComponent } from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/navbar";
import Pagination from "./components/pagination";
import { paginate } from "./utils/pagenate";
import SideBar from "./components/sidebar";
import Card from "./components/card";

class App extends Component {
  state = {
    files: [
      { id: 1, value: "File 1", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 2, value: "File 2", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 3, value: "File 3", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 4, value: "File 4", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 5, value: "File 5", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 6, value: "File 6", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 7, value: "File 7", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 8, value: "File 8", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 9, value: "File 9", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 10, value: "File 10", cards: [{ id: 0, value: "L0", textFieldValue:'' }] },
      { id: 11, value: "File 11", cards: [{ id: 0, value: "L0", textFieldValue:'' }] }
    ],
    cards: [{ id: 0, value: "L0", textFieldValue:'' }],
    pageSize: 5,
    currentPage: 1,
    cardNumber: 1,
    currentFile:0
  };

  deleteHandler = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };
  resetHandler = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };



  pageHandeler = (page) => {
    this.setState({ currentPage: page });
  };

  handleShiftEnter = (event,card) => {
    if (event.key === "Enter" && event.shiftKey) {
      const cardNumber = this.state.files[this.state.currentFile].cards.length + 1;
      const files = [...this.state.files];
      const file = files[this.state.currentFile];
      const cards = [...this.state.files[this.state.currentFile].cards];
      cards.splice(cards.indexOf(card)+1,0,{ id: cardNumber-1, value: "L" + (cardNumber-1) });
      file.cards=cards;
      files.splice(this.state.currentFile,1,file);
      //[...this.state.cards,{ id: cardNumber, value: "L" + cardNumber }];
      //alert(card.id);
      this.setState({ cardNumber, files });
    }
  };
  fileHandler= (file)=>{
    const currentFile = file.id-1;
    //alert("cuurentfile:"+currentFile+"  Numberof cards:"+file.cards.length);
    this.setState({currentFile, cardNumber: file.cards.length, currentPage: 1 });
  };

  _handleTextFieldChange= (e,card) => {
    if (e.key !== "Enter" && !e.shiftKey){
    card.textFieldValue=e.target.value;
    const cards= [...this.state.files[this.state.currentFile].cards];
    const files= [...this.state.files];
    const index= cards.findIndex((el) => el.id === card.id);
    files[this.state.currentFile].cards[index]=card;
    //console.log(files);
    //cards[index]=card;
    this.setState({
        files
    });
  }
};

  render() {
    const {
      pageSize,
      currentPage,
      files,
      currentFile
    } = this.state;
    const cards = paginate(files[currentFile].cards, currentPage, pageSize);
    return (
      <React.Fragment>
        <NavBar
          totalCounter={files[currentFile].cards.length}
        />
        <div className="row">
          <div className="col-2">
            <SideBar files ={ files} currentFile = {currentFile} onFileChange = {this.fileHandler}/>
          </div>
          <div className="col">


            {cards.map((card) => (
              <Card
                key={card.id}
                value={card.value}
                onKeyPress={this.handleShiftEnter}
                card={card}
                onChange={this._handleTextFieldChange}
              />
            ))}

            <Pagination
              itemCount={files[currentFile].cards.length}
              pageSize={pageSize}
              onPageChange={this.pageHandeler}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

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
    currentFile:0,
    recentCard:0,
    rCard:{ id: 0, value: "L0", textFieldValue:'' }
  };
  
  deleteHandler = (cardId) => {
    
    const files = [...this.state.files];
    files[this.state.currentFile].cards=files[this.state.currentFile].cards.filter((c)=> c.id !==cardId);
    this.setState({ files });
  };
  resetHandler = (cardId) => {
    const files = [...this.state.files];
    files[this.state.currentFile].cards[cardId-1].textFieldValue="";
    this.setState({ files });
  }; si

  pageHandeler = (page) => {
    this.setState({ currentPage: page });
  };

  handleShiftEnter = (event,card) => {
    if (event.key === "Enter" && event.shiftKey) {
      const cardNumber = this.state.files[this.state.currentFile].cards.length + 1;
      const files = [...this.state.files];
      const file = files[this.state.currentFile];
      const cards = [...this.state.files[this.state.currentFile].cards];
      cards.splice(cards.indexOf(card)+1,0,{ id: cardNumber-1, value: "L" + (cardNumber-1), textFieldValue:'' });
      file.cards=cards;
      files.splice(this.state.currentFile,1,file);
      this.setState({ cardNumber, files });
    }
  };
  fileHandler= (file)=>{
    const currentFile = file.id-1;
    //alert("cuurentfile:"+currentFile+"  Numberof cards:"+file.cards.length);
    this.setState({currentFile, cardNumber: file.cards.length, currentPage: 1, rCard:{ id: 0, value: "L0", textFieldValue:'' } });
  };

  _handleTextFieldChange= (e,card) => {
    if (e.key !== "Enter" && !e.shiftKey){
    card.textFieldValue=e.target.value;
    const cards= [...this.state.files[this.state.currentFile].cards];
    const files= [...this.state.files];
    const index= cards.findIndex((el) => el.id === card.id);
    files[this.state.currentFile].cards[index]=card;
    console.log(this.state.currentFile);
    //cards[index]=card;
    this.setState({
        files
    });
  }
};

handleClickOutside=(event) => {
  if (event.target.id==="Notebody") {
    /*const files = [...this.state.files];
    const file = files[this.state.currentFile];
    const cards = [...this.state.files[this.state.currentFile].cards];
    const card=cards[cards.length-1];
    const cardNumber = cards.length;
    files[this.state.currentFile].cards.push({ id: cardNumber, value: "L" + (cardNumber) });
    
    this.setState({files});*/
      //alert(event.target.id);
      const cardNumber = this.state.files[this.state.currentFile].cards.length + 1;
      const files = [...this.state.files];
      const file = files[this.state.currentFile];
      const cards = [...this.state.files[this.state.currentFile].cards];
      //console.log(cards);
      //console.log(this.state.rCard);
      //const index = cards.indexOf(this.state.rCard)+1;
      const index= cards.findIndex((el) => el.id === this.state.rCard.id)+1;
      //alert(index);
      cards.splice(index,0,{ id: cardNumber-1, value: "L" + (cardNumber-1), textFieldValue:'' });
      file.cards=cards;
      files.splice(this.state.currentFile,1,file);
      this.setState({ cardNumber, files });
  }
};
 handleVist = (card) => {
  const recentCard= card.id;
  //recentCard=event.target.id;
  //alert(recentCard);
  this.setState({recentCard, rCard:card});
  
 }
  
  render() {
    const {
      pageSize,
      currentPage,
      files,
      currentFile
    } = this.state;
    const cards = paginate(files[currentFile].cards, currentPage, pageSize);
    document.addEventListener('mousedown', this.handleClickOutside)
    return (
      <React.Fragment>
        <NavBar
          totalCounter={files[currentFile].cards.length}
        />
        <div className="row">
          <div className="col-2">
            <SideBar files ={ files} currentFile = {currentFile} onFileChange = {this.fileHandler}/>
          </div>
          <div className="col" id={"Notebody"}>


            {cards.map((card) => (
              <Card
                key={card.id}
                value={card.value}
                onKeyPress={this.handleShiftEnter}
                card={card}
                onChange={this._handleTextFieldChange}
                onClick={this.handleVist}
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

import React, { Component } from 'react';

const modalTitle = {
  fontFamily: 'Encode Sans Semi Expanded',
  fontSize: '18px', 
};

export default class AddCardModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }
  handleSubmit() {
    const uuidv1 = require('uuid/v1');
    let card = {};
    card.id = uuidv1();
    card.title = this.state.title;
    card.assignee = this.state.assignee;
    card.dueDate = this.state.dueDate.split("-").reverse().join('-');
    card.tags = this.state.tags.split(",");
    console.log(this.board1);    
    this.props.addCard(this.props.boardId, card);
    this.setState({title:'',assignee:'',dueDate:'',tags:''});
  }
  render() {
    return(
      <div className="modal fade" id="addCardModal" tabIndex="-1" role="dialog" aria-labelledby="addCardModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" style={modalTitle}  id="addCardModal">Add Card</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4">
                                  <label className="lead"> Board Name  </label>
                                </div>
                                <div className="col-sm-8">
                                  <input disabled className="field lead" onChange={event => this.handleChange(event)} type="text" id="boardId" value={this.props.boardId} name="board" required/>
                                </div>
                            </div>
                        </div>  

                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4">
                                  <label className="lead"> Title  </label>
                                </div>
                                <div className="col-sm-8">
                                  <input className="field lead" onChange={event => this.handleChange(event)} type="text" id="cardTitle" placeholder="card title" name="title" required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                                <div className="col-sm-4">
                                  <label className="lead"> Assign To  </label>
                                </div>
                                <div className="col-sm-8">
                                  <input className="field lead" onChange={event => this.handleChange(event)} type='text' id="assignTo" placeholder="assignee name" name="assignee" required/>                                                
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                                <div className="col-sm-4">
                                  <label className="lead"> Due Date  </label>
                                </div>
                                <div className="col-sm-8">
                                  <input required type='date' className="field lead" onChange={event => this.handleChange(event)} name="dueDate" id="dueDate" placeholder="due date"/><span className="glyphicon glyphicon-calendar"></span>                                                
                                </div>
                          </div>
                        </div>
                        <div className="form-group">
                        <div className="row">
                                <div className="col-sm-4">
                                  <label className="lead"> Tags  </label>
                                </div>
                                <div className="col-sm-8">
                                  <input required type='text' className="field lead" onChange={event => this.handleChange(event)} name="tags" id="tags" placeholder="tags"/><span className="fa fa-tags" aria-hidden="true"></span>                                                
                                        <small id="tagInfo" className="form-text text-muted">
                                            Have tags separated by comma <br/>
                                            [i.e. #important, #primary]
                                        </small>
                                </div>
                          </div>
                        </div>
                    <button type="submit" className="btn btn-primary">Add</button>                                      
                    </form>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
    );
  }
}
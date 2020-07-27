import React,{Component} from 'react';
import { Card, CardImg,  CardText, CardBody,
    CardTitle ,Breadcrumb, BreadcrumbItem,Button,Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row,Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                   <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col xs={12}>
                                        <Label htmlFor="rating">Rating</Label>
                                    </Col>
                                    <Col>
                                        <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col xs={12}>
                                        <Label htmlFor="name">Your Name</Label>
                                    </Col>
                                    <Col>
                                        <Control.text model=".name" id="name" name="name"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col xs={12}>
                                        <Label for="comment">Comment</Label>
                                    </Col>
                                    <Col>
                                        <Control.textarea model=".comment" name="comment" id="comment" className="form-control" rows="6" / >
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col xs={12}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                                
                            </LocalForm>

                        </ModalBody>
                    </Modal>
            </div>
        )
    }
}
    function DishDetail(props){
        const RenderDish=({dish})=>{
            if (dish===undefined||dish === null)
            {   
                return(
                    
                    <div></div>
                );
            }
            else {
            
            return(
                <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg  top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
            );
            }
          
        }
        const RenderComments=({comments,addComment,dishId})=>{
            if(comments.length===0)
            {  
                return(
                    <div></div>
                );
            } 
            else{
                return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {comments.map(comment => 
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                            <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                            )}
                        </ul>
                        <CommentForm dishId={dishId} addComment={addComment}  />
                    </div>
                );
            }
        }
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} addComment={props.addComment} 
                        dishId={props.dish.id}/>
                    </div>
                </div>
            );
    }
export default DishDetail;
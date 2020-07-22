import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        console.log("hello");
        this.state ={

        };
    }
    commentList(comments) {
        
      
        return (
          <ul className="list-unstyled">
            {comments.map(comment => 
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author} , {comment.date}</p>
            </li>
            )}
          </ul>
        );
      }
    
    renderComments(dish){
        if(dish==null||  dish.comments.length==0)
        {  console.log("hello from renderComments");
            return(
                <div></div>
            );

                
        } 
        else{
            
            return(
                
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.commentList(dish.comments)}
                    
                     
                </div>
                
            );
        }
    }
    renderDish(dish){
        if (dish===undefined||dish === null)
        {   
            return(
                
                <div></div>
            );
        }
        else {
        console.log(dish.id);
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
    render(){
        return(
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish) }
                    {this.renderComments(this.props.dish)}

                 </div>
            </div>
           
        );
    }

}
export default DishDetail;
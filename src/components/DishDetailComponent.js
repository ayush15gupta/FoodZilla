import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
    function CommentList({comments}) {
        
      
        return (
          <ul className="list-unstyled">
            {comments.map(comment => 
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
            )}
          </ul>
        );
    }
    function RenderComments({dish}){
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
                    <CommentList comments={dish.comments}/>
                    
                     
                </div>
                
            );
        }
    }
    function RenderDish({dish}){
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

  const DishDetail = (props) =>{
 
    return(
        <div className="container">
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments dish={props.dish} />

                </div>
        </div>
        
    );
  
}
export default DishDetail;
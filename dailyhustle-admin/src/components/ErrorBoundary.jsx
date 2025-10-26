// ErrorBoundary.jsx - catches rendering errors in the tree below it
import React from "react";

/*
  An Error Boundary must be a class component per React's API.
  It catches rendering errors and displays a fallback UI.
*/
export default class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = { hasError:false, error:null };
  }

  static getDerivedStateFromError(err){
    // update state so the next render shows fallback UI
    return { hasError:true, error:err };
  }

  componentDidCatch(error, info){
    // In production you would log this to an external service
    console.error("ErrorBoundary caught:", error, info);
  }

  render(){
    if(this.state.hasError){
      return (
        <div style={{padding:20}}>
          <h2>Something went wrong</h2>
          <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.error)}</pre>
          <button onClick={()=>this.setState({hasError:false,error:null})} className="btn">Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

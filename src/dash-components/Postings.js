import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Postings() {
  
  /*useState vars*/
  const [allPosts, setAllPosts] = useState([]); // unfiltered posts
  const [posts, setPosts] = useState([]);
  const [spinnerVisible, setSpinner] = useState(false); // spinner state
  const [textField, setTextField] = useState(""); // message box text

  /*handle text change*/
  const handleTextChange = (e) => {
    setTextField(e.target.value);
    //console.log(textField); // success!
  }

  /*Post Modal Functions*/
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /*useEffect hooks*/
  useEffect(() => { // load posts on form load
    loadPosts();
  }, []);

  useEffect(() => {
    const spinnerElement = document.getElementById('spinner-main');
    if (spinnerVisible) {
      spinnerElement.classList.toggle('spinner-border',' ');
    }else{
      //console.log("Modal Closed");
    }
  }, [spinnerVisible]);

  /*hide spinner*/
  const hideSpinner = () => {
    setSpinner(false);
    setModalOpen(false); // success!!!
    setTextField("");
  }

  /*Post Functions*/

  const loadPosts = () => { // load post fun
    axios.get('http://localhost/react-apis/unc-communicator/post-manager/')
      .then(function (response) {
        //console.log(response.data);
        const postsWithId = response.data.map((post, index) => ({ ...post, id: index }));
        //console.log(postsWithId[2]);
        setAllPosts(postsWithId);
        setPosts(postsWithId);
      })
      .catch(function (error) {
        console.error('Error during post API request:', error);alert("Error Occured, Page Refresh Required");window.location.reload();
      });
  };

  function appendPost(messageData){
    //console.log(messageData); // post type, post text, caption, current time, current time, realPostID
    const NextPostID = posts[posts.length - 1]["id"] + 1;
    //console.log(NextPostID);
    let type = messageData[0] == "image" ? "image" : "post";
    setPosts([...posts, {id:NextPostID,caption:messageData[2],content:messageData[1],created:messageData[3],modified:messageData[4],postType:messageData[0],realPostID:messageData[5],type:type}]);
  }

  const sendPost = (messageType,messageText,currentTime) => { // send post fun (success!!!)
    let input = [];
    switch (messageType) {
      case "message": // Normal Message
        if(messageText.length < 11000 && messageText.length > 0){
          const messageCaption = messageText.split('|')[0].trim();
          const messageText2 = messageText.split('|')[1].trim();
          input = [messageType,messageText2,messageCaption,currentTime,currentTime];
          axios.post('http://localhost/react-apis/unc-communicator/post-manager/',input)
          .then(function (response) {
            console.log(response.data);
            let realPostID = response.data["realPostID"][0]["postID"];
            //console.log(realPostID);
            appendPost([...input,realPostID]);
            hideSpinner();
          })
          .catch(function (error) {
            console.error('Error during post API request:', error);
            alert("Error Occured, Page Refresh Required");
            window.location.reload();
          });  
        }else{
          alert("Invalid Input!");
        }
        break;

      case "URL": // URL Message
        if(messageText.length < 11000 && messageText.length > 0){
          // Get Site Title API
          axios.post('http://localhost/react-apis/url-title-api/?url=' + messageText)
          .then(function (response) {
            //console.log(response.data["title"]);
            // INSERT Rec API
            input = [messageType,messageText,response.data["title"],currentTime,currentTime];
            axios.post('http://localhost/react-apis/unc-communicator/post-manager/',input)
            .then(function (response) {
              console.log(response.data);
              let realPostID = response.data["realPostID"][0]["postID"];
              //console.log(realPostID);
              appendPost([...input,realPostID]);
              hideSpinner();
            })
            .catch(function (error) {
              console.error('Error during post API request:', error);
              alert("Error Occured, Page Refresh Required");
              window.location.reload();
            });
          })
          .catch(function (error) {
            console.error('Error during post API request:', error);
            alert("Error Occured, Page Refresh Required");
            window.location.reload();
          });
        }else{
          alert("Invalid Input!");
        }
        break;
    }    
  }

  const deletePost = (postID,realPostID,postType) => { // delete post fun (success!!!)
    const shouldDelete = window.confirm('Are you sure you want to delete this post?');
    if (shouldDelete && postID !== null) {
      // filter through JS
      setPosts(posts.filter(post => post.id !== postID));

      let input = [realPostID];
      if(postType != "image"){// find post type
        // call delete api for post
        axios.put('http://localhost/react-apis/unc-communicator/post-manager/',input)
        .then(function (response) {
          console.log(response.data); // success
        })
        .catch(function (error) {
          console.error('Error during post API request:', error);alert("Error Occured, Page Refresh Required");window.location.reload();
        });
      }else{
        // call delete api for img
        axios.put('http://localhost/react-apis/unc-communicator/img-manager/',input)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error('Error during post API request:', error);alert("Error Occured, Page Refresh Required");window.location.reload();
        });
      }      
    }
  }

  const filterMessages = (postType) => { // filter posts fun (success!!!)
    switch (postType) {
      case "All":
        setPosts(allPosts); // Reset to all posts
        break;

      case "Text":
        setPosts(allPosts.filter(post => post.postType === "message"));
        break;

      case "URL":
        setPosts(allPosts.filter(post => post.postType === "URL"));
        break;

      case "image":
        setPosts(allPosts.filter(post => post.postType === "image"));
        break;
    }
    //scrollToBottom();
  }
  /*Image Uploader*/
  const fileInputRef = useRef(null);
  const imgUploader = (selectedFile, imgName, imgCaption, currentTime) => { // image uploader fun
    const imgFile = new FormData(); // form data
    if (imgCaption.length > 0) {
      imgFile.append('task','insertImage');
      imgFile.append('file', selectedFile);
      imgFile.append('Image_Caption', imgCaption);
      imgFile.append('Image_Created', currentTime);
      imgFile.append('Image_Modified', currentTime);
    } else {
      imgFile.append('task','insertImage');
      imgFile.append('file', selectedFile);
      imgFile.append('Image_Caption', imgName);
      imgFile.append('Image_Created', currentTime);
      imgFile.append('Image_Modified', currentTime);
    }
    // Upload image data using axios
    axios.post('http://localhost/react-apis/unc-communicator/img-manager/',imgFile)
    .then(function (response) {
      console.log(response.data);
      appendPost(["image",response.data["url"],response.data["caption"],response.data["time"],response.data["time"],response.data["realPostID"]]); // add attributes
      //window.location.reload();
    })
    .catch(function (error) {
      console.error('Error during post API request:', error);alert("Error Occured, Page Refresh Required");window.location.reload();
    });    
  };

  function handleImageSelecter(){ // Trigger the click event of the hidden file input
    setSpinner(true); // spinner visible
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => { // handle the file change event of the input:file
    const selectedFile = event.target.files[0];
    // date finder
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    // call `imgUploader`
    imgUploader(selectedFile, selectedFile["name"], textField, dateTime);
  };

  return (
    <>
    <h1 style={{ display:'flex', justifyContent:'space-between',alignItems:'center', color: 'white', width: '100%', padding:'1%' }}>
      Your Posts 
      <FilterButton/>
    </h1>
    <div style={{ padding: '1em', height: '70%', overflowY: 'scroll', width: '100%', display:'flex', flexDirection:'column-reverse' }} id='scroller'>
      <div className='post-container' id='post-container'>
        {posts.map(post => (
          <div className="post" key={post.id} id={post.id}>
            <span className='w-100 d-flex justify-content-between text-ellipsis'>
              <span className="badge text-bg-primary" style={{height:'fit-content'}}>{post.postType}</span>
              <small className='badge text-info text-wrap text-end'>{post.caption}</small>
            </span>              
            <span className='w-100 d-flex justify-content-end'>
              <PostControlButton postID={post.id} postType={post.postType} onDelete={deletePost} realPostID={post.realPostID} postInfo={post}/>
            </span>
            {post.postType == 'image' ? 
            <img src={'http://localhost/react-apis/unc-communicator/img-manager/' + post.content} alt={post.content} className='post-img'/>
            : 
            <p style={{overflow:'hidden',textOverflow:'ellipsis'}}>{ post.postType == 'URL' ? ( <a href={post.content} className='post-text-url' role='p'>{post.content}</a> ) : post.content}</p>
            }
            <div className="collapse" id={"collapse" + post.id} style={{marginTop:'10px',width:'fit-content',cursor:'pointer'}} data-bs-toggle="collapse" data-bs-target={"#collapse" + post.id}>
              <div className="card card-body p-1">
                <ul style={{listStyle:'none',padding:'0',margin:'0'}}>
                  <li className='m-0 p-0 small'><i>Created On</i> : {post.created}</li>
                  <li className='m-0 p-0 small'><i>Last Modified</i> : {post.modified}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <span className='d-flex w-100 justify-content-between gap-1 align-items-center position-fixed rounded-4' style={{padding:'0px 20px',  bottom:'0', height:'15%' }}>      
      <textarea name="message-box" id="message-box" value={textField} onChange={handleTextChange} className="form-control form-control-sm rounded-3" placeholder='Caption | Message Content'/>
      <AddPostButton />
    </span>
    {isModalOpen ? ( // Post Modal
      <div className="post-modal rounded-4 shadow">
        <div className="post-modal-content">
          <span className='w-100 d-flex justify-content-between align-items-center'>
            <p style={{padding:'0px',margin:'0px'}}>Select Post Type</p>
            <span className="" id='spinner-main' aria-hidden="true"></span>
            <button onClick={closeModal} className='btn glass-container' style={{width:'fit-content',color:'white'}}>
              <i className="bi bi-x"></i>
            </button>
          </span>
          <ul className='post-modal-list'>
            <li onClick={() => {
                                var today = new Date();
                                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                var dateTime = date+' '+time;
                                sendPost('message', textField, dateTime);
                                setSpinner(true);
                        }}><i className="bi bi-chat-left-text-fill"></i> Text Message</li>
            <li onClick={() => {
                                var today = new Date();
                                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                var dateTime = date+' '+time;
                                sendPost('URL', textField, dateTime);
                                setSpinner(true);
                        }}><i className="bi bi-link"></i> URL Message</li>
            <li onClick={() => { handleImageSelecter(); }}>
              <i className="bi bi-image-fill"></i>
              <input id="imgSel" type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              Select an Image for Upload
            </li>
          </ul>
        </div>
      </div>
    ) : (<div></div>)}
    </>
  );

  function AddPostButton() {
    return (
      <button className='btn btn-add-post shadow rounded-5' style={{ aspectRatio: '1' }} onClick={openModal}>
        <i className="bi bi-send-plus-fill"></i>
      </button>
    );
  }

  function PostControlButton({ postID, postType, onDelete,realPostID, postInfo }) {
    return (
      <div className="dropdown">
        <button className="btn btn-post-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-three-dots"></i>
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#updatePostModal" onClick={()=>sendUpModalData(realPostID, postInfo)}>Edit</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => onDelete(postID,realPostID,postType)}>Delete</a></li>
          <li><a className="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target={"#collapse" + postID} aria-expanded="false" aria-controls="collapseExample">Info</a></li>
        </ul>
      </div>
    );
  }

  function FilterButton(){
    return(
      <div className="dropdown p-0 m-0" style={{height:'100%',display:'flex',alignItems:'center'}}>
        <button className="btn glass-container" style={{width:'fit-content',color:'white',height:'100%'}}  data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-filter"></i>
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#" onClick={() => filterMessages('All')}>All Messages</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => filterMessages('Text')}>Text Messages</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => filterMessages('URL')}>URL Messages</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => filterMessages('image')}>Images</a></li>
        </ul>
      </div>
    );
  }

  function sendUpModalData(postID, postInfo){
    //console.log(postInfo);
    document.getElementById('up_id').value = postID;
    document.getElementById('up_content').value = postInfo["content"];
    document.getElementById('up_caption').value = postInfo["caption"];
    document.getElementById('up_post_type').value = postInfo["postType"];

    if(postInfo["postType"] !== "image"){ // msg | url
      document.getElementById('up_content').disabled = false;
      document.getElementById("up_content_img").disabled = true;
      //document.getElementById("form-submit").disabled = false;
    }else{ // image
      document.getElementById('up_content').disabled = true;
      document.getElementById("up_content_img").disabled = false;
      //document.getElementById("form-submit").disabled = true;
    }
  }
}

export default Postings;
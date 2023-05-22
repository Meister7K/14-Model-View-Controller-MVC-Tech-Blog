const newCommentHandler = async (event) =>{
    event.preventDefault();

    const blog_id = parseInt(window.location.pathname.split('/').pop())
   
    const comment = document.querySelector('#newComment').value.trim();
    console.log(blog_id);

    if (comment){
        const response = await fetch('api/comment', {
            method: 'POST',
            body: JSON.stringify({comment_body: comment,
                blog_id: blog_id}),
            headers: {
                'Content-Type':'application/json',
            },
        });

        if(response.ok){
            document.location.reload();
        }else{
            alert('failed to create comment');
        }
    }
};

document.querySelector('.new-comment').addEventListener('submit',newCommentHandler);
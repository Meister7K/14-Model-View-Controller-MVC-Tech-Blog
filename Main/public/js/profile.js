
const newBlogHandler = async (event) =>{
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const body = document.querySelector('#blog-body').value.trim();

    if (title&&body){
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({title, body}),
            headers: {
                'Content-Type':'application/json',
            },
        });

        if(response.ok){
            document.location.replace('/profile');
        }else{
            alert('failed to create blog post');
        }
    }
};

const deleteBlogBtnHandler = async (event) =>{
    if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        console.log(id);

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            document.location.replace('/profile');
        }else{
            alert('failed to delete blog post');
        }
    }
};

const deleteCommentBtnHandler = async (event) =>{
    if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        console.log(id);

        const response = await fetch(`/api/comment/${id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            document.location.replace('/profile');
        }else{
            alert('failed to delete blog post');
        }
    }
};

// const updateBtnHandler = async (event) =>{
//     if(event.target.hasAttribute('data-id')){
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/blog/${id}`, {
//             method: 'UPDATE',
//         });

//         if(response.ok){
//             document.location.replace('/update');
//         }else{
//             alert('failed to update blog post');
//         }
//     }
// };

// document.querySelector('.blog-form').addEventListener('submit', updateBtnHandler);

document.querySelector('.blog-form').addEventListener('submit', newBlogHandler);

document.querySelector('.blog-list').addEventListener('click', deleteBlogBtnHandler);
document.querySelector('.comment-list').addEventListener('click', deleteCommentBtnHandler);

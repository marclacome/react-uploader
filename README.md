Snippet from my React/Redux CMS. I've extracted the component, actions and reducer which I've been working on for uploading images to the server.

Obviously it won't work for real unless you're connected to the backend. So for demo purposes I have replaced the function which does the xhr.send. It emulates an upload and updates the redux state accordingly so the upload component displays pseudo-valid data.

Can be run by yarn start, or the build can be run as http://localhost//react-uploader/build/index.html

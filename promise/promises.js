function fetchDataFromAPIWithTimeout(timeout) {
            return new Promise((resolve, reject) => {
                // Perform the fetch operation
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => {
                        // Check if the response is OK, if not, throw an error
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        // If the response is OK, parse the JSON
                        return response.json();
                    })
                    .then(data => {
                        // Resolve the Promise with the fetched data
                        resolve(data);
                    })
                    .catch(error => {
                        // If any error occurs during the fetch operation, reject the Promise
                        reject(error);
                    });

                // Set timeout for the fetch operation
                setTimeout(() => {
                    reject(new Error('Operation timed out'));
                }, timeout);
            });
        }

        // Event listener for fetch button click
        document.getElementById('fetchButton').addEventListener('click', () => {
            // Display "Loading..." when button is clicked
            const outputDiv = document.getElementById('output');
            outputDiv.textContent = 'Loading...';
            // Fetch data from API with a timeout of 5 seconds
            fetchDataFromAPIWithTimeout(5000)
                .then(posts => {
                    // Display fetched data
                    outputDiv.innerHTML = ''; 
                    if (posts.length === 0) {
                        outputDiv.textContent = 'No posts found.';
                    } else {
                        posts.forEach(post => {
                            const postElement = document.createElement('div');
                            postElement.classList.add('post');
                            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                            outputDiv.appendChild(postElement);
                        });
                    }
                })
                .catch(error => {
                    // Display error message if Promise is rejected
                    outputDiv.textContent = `Error: ${error.message}`;
                    console.error('Error fetching data:', error);
                });
        });

        // Set initial message when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const outputDiv = document.getElementById('output');
            outputDiv.textContent = 'Please wait until button is clicked';
        });
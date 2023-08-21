
    let booksData = []; // Global variable to store the books data

    // Function to fetch JSON data from the provided URL
    async function fetchBooksData() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/immarisabel/personal-website-content/main/books/library.json');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching books data:', error);
        return [];
      }
    }

    // Function to populate the book select dropdown
    async function populateBookSelect() {
      booksData = await fetchBooksData();
      var bookSelect = document.getElementById("bookSelect");
      bookSelect.innerHTML = '<option value="">-- Select a book --</option>';
      booksData.forEach(function (book, index) {
        var option = document.createElement("option");
        option.value = index;
        option.text = book.Name;
        bookSelect.appendChild(option);
      });
    }

    // Function to update the form fields when a book is selected
    function updateFormFields(bookIndex) {
      const book = booksData[bookIndex];
      document.getElementById("nameInput").value = book.Name;
      document.getElementById("authorInput").value = book.Author;
      document.getElementById("genreInput").value = book.Genre;
      document.getElementById("lengthInput").value = book.Length;
      // Update star rating
      const rating = parseInt(book.Rating);
      const starRating = document.querySelectorAll(".star-rating input[type='radio']");
      starRating.forEach((radio, index) => {
        radio.checked = index + 1 === rating;
      });
      document.getElementById("StatusInput").value = book.Status || "";
      document.getElementById("languageInput").value = book.Language;
      document.getElementById("originInput").value = book.Origin;
      document.getElementById("dateFinishedInput").value = book["Date Finished"] || "";
      document.getElementById("dateStartedInput").value = book["Date Started"] || "";
      document.getElementById("NotesInput").value = book.Notes || "";
      document.getElementById("isbnInput").value = book.ISBN;
      document.getElementById("reviewLinkInput").value = book["ReviewLink"] || "";
      document.getElementById("coverURLInput").value = book["CoverURL"] || "";
    }


    // Event listener for book select dropdown
    document.getElementById("bookSelect").addEventListener("change", function () {
      const selectedBookIndex = this.value;
      if (selectedBookIndex !== "") {
        updateFormFields(selectedBookIndex);
      } else {
        // Clear the form fields if no book is selected
        document.getElementById("bookForm").reset();
      }
    });

    populateBookSelect();

    // Function to update the textarea with the updated JSON data
    function updateJSONTextarea() {
      const bookIndex = document.getElementById("bookSelect").value;
      const book = booksData[bookIndex];
      const jsonTextarea = document.getElementById("jsonTextarea");
      jsonTextarea.value = JSON.stringify(book, null, 2);
    }

    const saveButton = document.getElementById("saveButton");

   // Function to update book data in the booksData array
function updateBookData(selectedIndex) {
  const selectedBook = booksData[selectedIndex];
  selectedBook.Name = document.getElementById("nameInput").value;
  selectedBook.Author = document.getElementById("authorInput").value;
  selectedBook.Genre = document.getElementById("genreInput").value;
  selectedBook.Length = parseInt(document.getElementById("lengthInput").value);

  // Update star rating
  const starRating = document.querySelectorAll(".star-rating input[type='radio']");
  starRating.forEach((radio, index) => {
    if (radio.checked) {https://github.com/immarisabel/personal-website-content/blob/main/books/library.json
      selectedBook.Rating = (index + 1).toString();
    }
  });

  selectedBook.Status = document.getElementById("StatusInput").value;
  selectedBook.Language = document.getElementById("languageInput").value;
  selectedBook.Origin = document.getElementById("originInput").value;
  selectedBook["Date Finished"] = document.getElementById("dateFinishedInput").value;
  selectedBook["Date Started"] = document.getElementById("dateStartedInput").value;
  selectedBook.Notes = document.getElementById("NotesInput").value;
  selectedBook.ISBN = document.getElementById("isbnInput").value;
  selectedBook["ReviewLink"] = document.getElementById("reviewLinkInput").value;
  selectedBook["CoverURL"] = document.getElementById("coverURLInput").value;
}

    // Save changes button click handler
    saveButton.addEventListener("click", () => {
      const selectedIndex = parseInt(document.getElementById("bookSelect").value);
      if (!isNaN(selectedIndex) && selectedIndex >= 0) {
        updateBookData(selectedIndex);
        updateJSONTextarea(); // Update the textarea with the latest JSON data
        console.log(JSON.stringify(booksData, null, 2));
        alert("Changes saved successfully!");
      } else {
        alert("Please select a book before saving changes.");
      }
    });

    // Load the initial JSON data into the textarea when the page loads
    updateJSONTextarea();

    // Function to copy JSON text to clipboard
    function copyJSONToClipboard() {
      const jsonText = document.getElementById("jsonTextarea").value;
      const tempInput = document.createElement("textarea");
      tempInput.style = "position: absolute; left: -1000px; top: -1000px";
      tempInput.value = jsonText;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("JSON data copied to clipboard!");
    }

    // Add click event listener to the COPY button
    document.getElementById("copyButton").addEventListener("click", copyJSONToClipboard);


    // Function to trigger JSON download for the entire dataset
    function downloadEntireJSON() {
      const jsonContent = JSON.stringify(booksData, null, 2);

      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "library.json";
      a.click();

      URL.revokeObjectURL(url);
    }

    // Add click event listener to the Download JSON button
    document.getElementById("downloadButton").addEventListener("click", downloadEntireJSON);


    // GITHUB COMMIT FILE


    // Update the existing downloadEntireJSON function
    function downloadEntireJSON() {
      const jsonContent = JSON.stringify(booksData, null, 2);
      commitJSONToGitHub(jsonContent);
    }

    // GITHUB COMMIT

    // Update the commitJSONToGitHub function to handle the commit process for the entire JSON dataset
    async function commitEntireJSONToGitHub() {
      try {
        const accessToken = "TOKEN HERE";
        const repoOwner = "YOUR GITHUB USERNAME";
        const repoName = "REPO NAME";
        const filePath = "books/library.json";



        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

        // Fetch the current file content from GitHub to get the sha
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        const sha = data.sha;

        // Construct the new content and commit data for the entire JSON dataset
        const commitMessage = "Update JSON data";
        const jsonContent = JSON.stringify(booksData, null, 2);
        const newContent = btoa(unescape(encodeURIComponent(jsonContent)));

        const commitData = {
          message: commitMessage,
          content: newContent,
          sha: sha,
        };

        // Send the updated content to GitHub
        const commitResponse = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commitData),
        });

        if (commitResponse.ok) {
          alert("JSON data committed to GitHub!");
        } else {
          alert("Error committing JSON data to GitHub.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Check the console for details.");
      }
    }

    // Add click event listener to the Commit to GitHub button
    document.getElementById("commitButton").addEventListener("click", commitEntireJSONToGitHub);

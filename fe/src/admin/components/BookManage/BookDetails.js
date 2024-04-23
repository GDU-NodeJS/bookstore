import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookApi from "../../api/bookapi";

const BookDetails = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await bookApi.getById(_id);
        setBookDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [_id]);

  const handleEditClick = () => {
    navigate(`/admin/books/${_id}/edit`);
  };

  const handleBackClick = () => {
    navigate("/admin/books");
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!bookDetails) {
    return <Typography>No book details found for ID: {_id}</Typography>;
  }

  return (
    <div className="bgcolor">
      <Box height={80} />
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img
              // src={`data:image/jpeg;base64,${bookDetails.bookImage}`}
              src={bookDetails.image}
              alt="Book cover"
              style={{ maxWidth: "90%", height: "auto" }}
            />
          </Grid>
          {/* Right column for book details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {bookDetails.name}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Author:</strong> {bookDetails.author}
            </Typography>
            <Typography variant="body1">
              <strong>Categories:</strong> {bookDetails.categories.map(category => category.name).join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong>{" "}
              {bookDetails.description || "No description available"}
            </Typography>
            {/* <Typography variant="body1">
              <strong>Number of Pages:</strong> {bookDetails.number_of_pages}
            </Typography> */}
            {/* <Typography variant="body1">
              <strong>Language:</strong> {bookDetails.language}
            </Typography> */}
            {/* <Typography variant="body1">
              <strong>Publication Date:</strong>{" "}
              {formatDate(bookDetails.publication_date)}
            </Typography> */}
            {/* <Typography variant="body1">
              <strong>Dimensions:</strong> {bookDetails.dimensions}
            </Typography> */}
            <Typography variant="body1">
              <strong>Price:</strong> ${bookDetails.price}
            </Typography>
            <Box mt={2}>
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>{" "}
              <Button variant="outlined" onClick={handleBackClick}>
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box height={10} />
    </div>
  );
};

export default BookDetails;

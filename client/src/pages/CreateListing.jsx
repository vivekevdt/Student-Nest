import { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { app } from "../firebase";
import axiosInstance from "../utils/axiosInstance";
import MapPicker from "../components/MapPicker";

const CHECKBOX_FIELDS = [
  { id: "sharing", label: "Sharing Room" },
  { id: "single", label: "Single Room" },
  { id: "studyTable", label: "Study Table" },
  { id: "bathroom", label: "Attached Bathroom" },
  { id: "balcony", label: "Balcony" },
  { id: "electricityBill", label: "Electricity Included" },
  { id: "offer", label: "Offer" },
];

export default function CreateListing() {
  const host = window.location.hostname;
  const apiUrl =
    host === "localhost"
      ? "http://localhost:3000"
      : "https://student-nest-vivek.onrender.com";

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "single",
    floor: 0,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    studyTable: false,
    bathroom: false,
    balcony: false,
    electricityBill: false,
    latitude: "",
    longitude: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Leaflet map initialization
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance.current);

    mapInstance.current.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));

      if (markerRef.current) markerRef.current.setLatLng(e.latlng);
      else markerRef.current = L.marker(e.latlng).addTo(mapInstance.current);

      setValidationErrors((prev) => ({ ...prev, latitude: "" }));
    });
  }, []);

  // Firebase image upload
  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        reject,
        () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
      );
    });
  };

  const handleImageSubmit = async () => {
    if (files.length + formData.imageUrls.length > 6) {
      return setImageUploadError("Max 6 images allowed");
    }

    setUploading(true);
    setImageUploadError("");

    try {
      const urls = await Promise.all([...files].map((file) => storeImage(file)));
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
      setFiles([]);
    } catch {
      setImageUploadError("Upload failed. Images must be under 2MB");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const isBooleanField = type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [id]: isBooleanField ? checked : value,
      ...(id === "sharing" || id === "single" ? { type: id } : {}),
    }));

    setValidationErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (formData.imageUrls.length < 1) errors.images = "Upload at least 1 image";
    if (+formData.discountPrice > +formData.regularPrice)
      errors.discountPrice = "Discount must be lower than regular price";
    if (!formData.latitude || !formData.longitude)
      errors.latitude = "Select a location on the map";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(`${apiUrl}/api/listing/create`, {
        ...formData,
        hostId: currentUser?.userDetail?._id,
      });

      const data = res.data;
      setLoading(false);

      if (data.success) {
        toast.success("🎉 Listing created successfully!");
        // navigate(`/listing/${data._id}`);
      } else {
        toast.error(`❌ Failed to create listing: ${data?.message || "Error"}`);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #e0f7fa, #f3e5f5)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 1000, width: "100%", borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
            Create a Listing
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Left Section */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  id="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  error={!!validationErrors.name}
                  helperText={validationErrors.name}
                />
                <TextField
                  label="Description"
                  id="description"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  error={!!validationErrors.description}
                  helperText={validationErrors.description}
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Address"
                  id="address"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  error={!!validationErrors.address}
                  helperText={validationErrors.address}
                  sx={{ mt: 2 }}
                />

                <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                  {CHECKBOX_FIELDS.map(({ id, label }) => (
                    <FormControlLabel
                      key={id}
                      control={
                        <Checkbox
                          id={id}
                          checked={formData[id] || formData.type === id}
                          onChange={handleChange}
                        />
                      }
                      label={label}
                    />
                  ))}
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  <TextField
                    label="Floor"
                    id="floor"
                    type="number"
                    value={formData.floor}
                    onChange={handleChange}
                    sx={{ width: "48%" }}
                  />
                  <TextField
                    label="Regular Price (₹/month)"
                    id="regularPrice"
                    type="number"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    sx={{ width: "48%" }}
                  />
                  {formData.offer && (
                    <TextField
                      label="Discount Price (₹/month)"
                      id="discountPrice"
                      type="number"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      error={!!validationErrors.discountPrice}
                      helperText={validationErrors.discountPrice}
                      sx={{ width: "100%" }}
                    />
                  )}
                </Box>
              </Grid>

              {/* Right Section */}
              <Grid item xs={12} md={6}>
                <Typography fontWeight="medium" mb={1}>
                  Images (max 6)
                </Typography>

                {/* Upload Row */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleImageSubmit}
                    disabled={uploading}
                  >
                    {uploading ? <CircularProgress size={20} /> : "Upload"}
                  </Button>
                </Box>
                {(imageUploadError || validationErrors.images) && (
                  <Typography color="error" variant="body2" mt={1}>
                    {imageUploadError || validationErrors.images}
                  </Typography>
                )}

                {/* Image Slider */}
                {formData.imageUrls.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 2,
                      mt: 2,
                      pb: 1,
                      "&::-webkit-scrollbar": { height: 6 },
                      "&::-webkit-scrollbar-thumb": { backgroundColor: "#bbb", borderRadius: 3 },
                    }}
                  >
                    {formData.imageUrls.map((url, index) => (
                      <Box
                        key={url}
                        sx={{
                          position: "relative",
                          minWidth: 120,
                          height: 120,
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: 2,
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={url}
                          alt="Listing"
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                        />
                        <Button
                          onClick={() => handleRemoveImage(index)}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            minWidth: 0,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "white",
                            "&:hover": { backgroundColor: "rgba(255,0,0,0.8)" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Map Picker */}
                <Box sx={{ mt: 3 }}>
                  <MapPicker
                    onLocationSelect={({ lat, lng }) =>
                      setFormData({ ...formData, latitude: lat, longitude: lng })
                    }
                  />
                  {validationErrors.latitude && (
                    <Typography color="error" variant="body2" mt={1}>
                      {validationErrors.latitude}
                    </Typography>
                  )}
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, py: 1.5, backgroundColor: "#1565c0", "&:hover": { backgroundColor: "#0d47a1" } }}
                  disabled={loading || uploading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Create Listing"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

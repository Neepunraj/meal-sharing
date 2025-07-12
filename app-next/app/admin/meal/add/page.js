
"use client";
import React, { useEffect, useState } from "react";
import styles from './Addmeal.module.css'
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useMealContext } from "@/context/mealContext";

const initaialFormdata = {
  title: "",
  description: "",
  location: "",
  when: '',
  price: '',
  max_reservations: '',


}

export default function AddMeal() {
  const [formState, setFormState] = useState(initaialFormdata
  );
  const [selectedfiles, setSelectedfiles] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const getCurrentEditID = searchParams.get("id");
  const isEditMode = !!getCurrentEditID;
  const { fetchMealbyId, isLoading, createMeal, updateMeal } = useMealContext()

  const handleFileChange = (event) => {
    if (event.target.files) {
      setSelectedfiles(Array.from(event.target.files))
    }
  }
  const handleInputChange = (event) => {
    setFormState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
    });
    if (!isEditMode) {
      selectedfiles.forEach((file) => {
        formData.append("images", file);
      });
    }
    const result = isEditMode
      ? await updateMeal(getCurrentEditID, formData)
      : await createMeal(formData);
    if (result) {
      router.push("/admin/meal/list");
    }
  }
  function handleClickUpload() { }



  useEffect(() => {
    if (isEditMode) {
      fetchMealbyId(getCurrentEditID).then(meal => {
        if (meal) {
          setFormState({
            title: meal.title,
            description: meal.description,
            location: meal.location,
            when: formatDate(meal.when),
            price: meal.price,
            max_reservations: meal.max_reservations,
          })
        }
      })
    }
  }, [])
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
  }
  return <div className={styles.container}>
    <header className={styles.header}>
      <h2>Add A Meal</h2>
    </header>

    <form onSubmit={handleFormSubmit} className={styles.form}>
      {!isEditMode && (
        <div className={styles.uploadArea}>
          <div className={styles.uploadContent} onClick={handleClickUpload}>
            <span className={styles.uploadIcon}>
              <Upload />
            </span>
            <div className={styles.browseLabel}>
              <label>
                <span>Click to browse</span>{" "}
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </label>
            </div>
          </div>

          {selectedfiles.length > 0 && (
            <div className={styles.previewContainer}>
              {selectedfiles.map((file, index) => (
                <div key={index} className={styles.previewImageWrapper}>
                  <img
                    alt={`Preview ${index + 1}`}
                    src={URL.createObjectURL(file)}
                    width={80}
                    height={80}
                    className={styles.previewImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.fields}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Meal Title</label>
          <input
            name="title"
            placeholder="Meal Title"
            onChange={handleInputChange}
            value={formState.title}
          />
        </div>



        <div className={styles.formGroup}>
          <label htmlFor="description">Meal Description</label>
          <textarea
            name="description"
            placeholder="Meal Description"
            onChange={handleInputChange}
            value={formState.description}
            rows={6}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            name="location"
            placeholder="Locations"
            onChange={handleInputChange}
            value={formState.location}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="when">When</label>
          <input
            name="when"
            placeholder="when"
            type="date"
            onChange={handleInputChange}
            value={formState.when}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="max_reservations">Max ReserVations</label>
          <input
            name="max_reservations"
            type="number"
            min={0}
            placeholder="Max Reservations"
            onChange={handleInputChange}
            value={formState.max_reservations}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            placeholder="Price"
            min={0}
            onChange={handleInputChange}
            value={formState.price}
          />
        </div>



        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isEditMode ? isLoading ? "Updating A Meal..." : "Update" : isLoading ? "Adding A Meal..." : "Add a Meal"}
        </button>
      </div>
    </form>
  </div>
}

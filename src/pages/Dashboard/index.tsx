import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/header-bar';
import SubHeaderBar from '../../components/sub-header-bar';
import { Container, Grid, Paper } from '@mui/material';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: '1', name: 'Bundles' },
  { id: '2', name: 'Hot Power Bowls' },
  { id: '3', name: 'Vegan Menu' },
  { id: '4', name: 'Rainbow Wraps' },
  { id: '5', name: 'Snacks & Sides' },
  // Add more categories as needed
];

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = 64; // Height of the main header
      const categoryPositions = categories.map((category) => {
        const element = document.getElementById(category.id);
        const rect = element?.getBoundingClientRect();
        const position = rect ? rect.top + scrollY - headerHeight : 0;
        return {
          id: category.id,
          position,
        };
      });

      console.log(categoryPositions);

      let selectedCategoryId = categories[0].id;

      for (let i = 0; i < categoryPositions.length; i++) {
        console.log('scrollY', scrollY);
        if (scrollY >= categoryPositions[i].position) {
          selectedCategoryId = categoryPositions[i].id;
        } else {
          break;
        }
      }

      // Update the selected category only if it's different from the current selected category
      if (selectedCategoryId !== selectedCategory) {
        setSelectedCategory(selectedCategoryId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
      const headerHeight = 64; // Height of the main header
      const targetScrollPosition = categoryElement.offsetTop - headerHeight;
      window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <React.Fragment>
      <HeaderBar />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper style={{ height: '300px', overflowY: 'scroll' }}></Paper>
          </Grid>
        </Grid>
      </Container>
      <SubHeaderBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      {/* Add your main content and sections here */}
      {categories.map((category) => (
        <div
          key={category.id}
          id={category.id}
          style={{ height: '300px', border: '1px solid #ccc' }}
        >
          {category.id}
          {category.name}
          {selectedCategory}
        </div>
      ))}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ height: '200px', backgroundColor: 'gray' }}>Bottom</Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;

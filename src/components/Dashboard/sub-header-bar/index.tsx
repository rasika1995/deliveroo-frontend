import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

interface Category {
  id: string;
  name: string;
}

interface SubHeaderProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <AppBar position="sticky" color="default" style={{ top: 64 /* height of the main header */ }}>
      <Toolbar>
        {categories.map((category) => (
          <Button
            key={category.id}
            color="primary"
            variant={selectedCategory === category.id ? 'contained' : 'text'}
            style={{
              margin: '0 16px',
              fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
              color: selectedCategory === category.id ? 'white' : '#17CFBB',
              borderRadius: '20px',
            }}
            onClick={() => onCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default SubHeader;

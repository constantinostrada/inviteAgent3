import React, { useState } from 'react';
import styled from 'styled-components';

interface FormData {
  name: string;
  email: string;
  role: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  submit?: string;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #5826FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: normal;
  margin: 0 0 40px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 32px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #5826FF;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #5826FF;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
  background-color: #5826FF;
  border-radius: 4px;
  margin-top: 20px;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #FF0000;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: #00AA00;
  font-size: 16px;
  text-align: center;
  margin-top: 16px;
`;

const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would normally make an API call to create the user
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        role: ''
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create user. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Add New User</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="role">Role</Label>
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
          </Select>
          {errors.role && <ErrorMessage>{errors.role}</ErrorMessage>}
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating User...' : 'Create User'}
        </Button>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        {success && (
          <SuccessMessage>
            User created successfully!
          </SuccessMessage>
        )}
      </Form>
    </Container>
  );
};

export default AddUserForm;
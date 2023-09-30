'use client';
import { LoginContext } from '@/context/LoginContext';
import { useContext } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Table from './components/Table/Table';

export default function Home() {
  const { newToken } = useContext(LoginContext);

  return newToken ? <Table /> : <LoginForm />;
}

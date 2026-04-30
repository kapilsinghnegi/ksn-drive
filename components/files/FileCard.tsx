import { Models } from 'node-appwrite';
import React from 'react';

export default function FileCard({ file }: { file: Models.File }) {
  return <h1 className="text-lg font-medium">{file.name}</h1>;
}

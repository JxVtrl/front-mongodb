"use client";
import React, { useState } from 'react';
import imageDefault from '../../assets/profile-user.png'
import { useApp } from '@/contexts/contextApi';

const Profile: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string>('');
    const { userProfileImage, setUserProfileImage } = useApp();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            const imageUrl = URL.createObjectURL(file);
            setUserProfileImage(imageUrl);
        }
    };

    const handleUpload = async () => {
        const fileInput = document.getElementById('imageInput') as HTMLInputElement;
        const file = fileInput.files ? fileInput.files[0] : null;
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await fetch('https://api.imgur.com/3/image', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Client-ID SUA_CLIENT_ID'
                    },
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    alert(`Imagem enviada com sucesso! Link: ${data.data.link}`);
                } else {
                    alert('Falha no upload da imagem.');
                }
            } catch (error) {
                console.error('Erro ao fazer upload da imagem:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-bold mb-4">Upload de Imagem para o perfil de usuário</h2>
            <input 
                type="file" 
                id="imageInput" 
                accept="image/*" 
                onChange={handleImageChange}
                className="mb-4"
            />
            <h3 className="text-md font-semibold mb-2">Pré-visualização da Imagem:</h3>
            {imagePreview ? (
                <img src={imagePreview} className="max-w-xs" alt="Preview" />
            ) : (
                <img src={imageDefault.src} alt="User default Profile" className="w-5 h-5 mx-auto cursor-pointer" />
            )}
        </div>

    );
};

export default Profile;

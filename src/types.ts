import React from 'react';

export type ContactTheme = 'especialista' | 'orcamento' | 'showroom' | 'outro';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

export interface BrandPartner {
  name: string;
  category: string;
  url: string;
}

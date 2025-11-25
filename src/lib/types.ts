import type { ComponentType } from 'svelte';

export interface ServiceItem {
	title: string;
	description: string;
	icon: ComponentType;
}

export interface ProjectAnalysis {
	summary: string;
	techStack: string[];
	estimatedDuration: string;
	complexity: 'Low' | 'Medium' | 'High' | 'Enterprise';
	recommendation: string;
}

export enum ContactStatus {
	IDLE = 'IDLE',
	ANALYZING = 'ANALYZING',
	SENDING = 'SENDING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export interface TeamMember {
	name: string;
	role: string;
	image: string;
}

export interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	description: string;
	analysis?: ProjectAnalysis | null;
}

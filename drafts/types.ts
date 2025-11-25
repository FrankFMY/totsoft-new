import React from 'react';

export interface ServiceItem {
	title: string;
	description: string;
	icon: React.ReactNode;
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

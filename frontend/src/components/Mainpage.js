import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const Mainpage = () => {
    const [tasks, setTasks] = useState([]);

    const fetchdata = async () => {
        try {
            const response = await axios.get('https://project-dashboard-application-nareshkum.onrender.com/projects/projects');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return '#4CAF50'; // Green
            case 'In Progress':
                return '#FFC107'; // Yellow
            case 'To Do':
                return '#FF5252'; // Red
            default:
                return '#999'; // Default color
        }
    };

    const pieChartData = {
        labels: ['Completed', 'In Progress', 'To Do'],
        datasets: [{
            data: tasks.length > 0 ? [
                tasks.filter(task => task.status === 'Completed').length,
                tasks.filter(task => task.status === 'In Progress').length,
                tasks.filter(task => task.status === 'To Do').length,
            ] : [],
            backgroundColor: [
                getStatusColor('Completed'),
                getStatusColor('In Progress'),
                getStatusColor('To Do'),
            ],
        }],
    };

    const pieChartOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    },
                    title: (context) => {
                        const hoveredElement = tasks[context.dataIndex];
                        return hoveredElement ? hoveredElement.status : '';
                    },
                },
            },
        },
    };

    const start_date = new Date('2024-02-16'); // Start date
    const end_date = new Date('2024-02-22'); // End date

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= start_date && taskDate <= end_date && task.status === 'Completed';
    });

    const lineChartData = {
        labels: Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (7 - i - 1));
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            return formattedDate;
        }),
        datasets: [{
            label: 'Completed Tasks',
            data: Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (7 - i - 1));
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                return filteredTasks.filter(t => {
                    const taskDate = new Date(t.date);
                    const taskFormattedDate = `${taskDate.getFullYear()}-${(taskDate.getMonth() + 1).toString().padStart(2, '0')}-${taskDate.getDate().toString().padStart(2, '0')}`;
                    return taskFormattedDate === formattedDate;
                }).length;
            }),
            fill: false,
            borderColor: 'green',
        }],
    };

    const lineChartOptions = {
        scales: {
            x: {
                beginAtZero: true,
                max: 7,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = Math.round(context.parsed || 0);
                        return `${label}: ${value}`;
                    },
                    title: (context) => {
                        const index = context.dataIndex;
                        const date = index >= 0 && index < tasks.length ? tasks[index].date : '';
                        const completedCount = filteredTasks.filter(t => {
                            const taskDate = new Date(t.date);
                            const taskFormattedDate = `${taskDate.getFullYear()}-${(taskDate.getMonth() + 1).toString().padStart(2, '0')}-${taskDate.getDate().toString().padStart(2, '0')}`;
                            return taskFormattedDate === date;
                        }).length;

                        return `${date}: Completed count show on y Axis task${completedCount !== 1 ? 's' : ''}`;
                    },
                },
            },
        },
    };

    return (
        <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full md:w-2/3 mx-auto">
                <h1 className="text-pink-500 text-lg font-bold mb-4">Pie Chart</h1>
                <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="w-full md:w-2/3 mx-auto mt-4 md:mt-0">
                <h1 className="text-pink-500 text-lg font-bold mb-4">Line Chart</h1>
                <Line className='bg-pink-100' data={lineChartData} options={lineChartOptions} />
            </div>
        </div> 
    </div>
    
    );
}

export default Mainpage;

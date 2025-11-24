import React from 'react';
import { Paper, Typography, Box, Card, useTheme, Stack, Chip, LinearProgress, Avatar, AvatarGroup } from '@mui/material';
import { LineChart, BarChart, PieChart, Gauge, gaugeClasses } from '@mui/x-charts';
import DsGrid from '../components/layout/DsGrid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface SummaryCardProps {
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
    color: string;
}

function SummaryCard({ title, value, change, icon, color }: SummaryCardProps) {
    const isPositive = change >= 0;
    return (
        <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </Box>
                <Chip
                    icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={`${isPositive ? '+' : ''}${change}%`}
                    size="small"
                    color={isPositive ? 'success' : 'error'}
                    sx={{ fontWeight: 'medium' }}
                />
            </Box>
            <Typography color="text.secondary" variant="body2" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {value}
            </Typography>
        </Card>
    );
}

interface ProjectCardProps {
    name: string;
    progress: number;
    status: 'active' | 'pending' | 'completed';
    team: number;
    deadline: string;
}

function ProjectCard({ name, progress, status, team, deadline }: ProjectCardProps) {
    const statusColors: Record<string, 'primary' | 'warning' | 'success'> = {
        active: 'primary',
        pending: 'warning',
        completed: 'success',
    };

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                    {name}
                </Typography>
                <Chip label={status} size="small" color={statusColors[status]} />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                        Progress
                    </Typography>
                    <Typography variant="caption" fontWeight="medium">
                        {progress}%
                    </Typography>
                </Box>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 1 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                    {Array.from({ length: team }).map((_, i) => (
                        <Avatar key={i} sx={{ bgcolor: `hsl(${i * 60}, 70%, 60%)` }}>
                            {String.fromCharCode(65 + i)}
                        </Avatar>
                    ))}
                </AvatarGroup>
                <Typography variant="caption" color="text.secondary">
                    Due: {deadline}
                </Typography>
            </Box>
        </Paper>
    );
}

function Dashboard() {
    const theme = useTheme();

    // 매출 데이터 (월별)
    const revenueData = {
        xAxis: [
            {
                scaleType: 'band' as const,
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
        ],
        series: [
            {
                label: '2024 Revenue',
                data: [4000, 3000, 5000, 4500, 6000, 5500, 7000, 6500, 8000, 7500, 9000, 8500],
                color: theme.palette.primary.main,
            },
            {
                label: '2023 Revenue',
                data: [2400, 2210, 2900, 3000, 3200, 3100, 3500, 3400, 4000, 3900, 4500, 4200],
                color: theme.palette.secondary.main,
            },
        ],
    };

    // 사용자 활동 데이터
    const userActivityData = {
        xAxis: [
            {
                scaleType: 'point' as const,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
        ],
        series: [
            {
                label: 'Active Users',
                data: [1200, 1900, 1500, 2000, 2200, 1800, 1400],
                curve: 'natural' as const,
                color: theme.palette.charts.main,
            },
        ],
    };

    // 카테고리별 판매 데이터
    const salesByCategory = [
        { id: 0, value: 35, label: 'Electronics', color: theme.palette.primary.main },
        { id: 1, value: 25, label: 'Clothing', color: theme.palette.secondary.main },
        { id: 2, value: 20, label: 'Food', color: theme.palette.success.main },
        { id: 3, value: 15, label: 'Books', color: theme.palette.warning.main },
        { id: 4, value: 5, label: 'Others', color: theme.palette.info.main },
    ];

    // 프로젝트 목록
    const projects = [
        { name: 'Website Redesign', progress: 75, status: 'active' as const, team: 5, deadline: '2024-12-30' },
        { name: 'Mobile App Development', progress: 45, status: 'active' as const, team: 4, deadline: '2025-01-15' },
        { name: 'Marketing Campaign', progress: 90, status: 'active' as const, team: 3, deadline: '2024-12-20' },
        { name: 'Database Migration', progress: 30, status: 'pending' as const, team: 6, deadline: '2025-02-01' },
    ];

    return (
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Stack spacing={3} sx={{ pb: 6 }}>
                {/* 페이지 제목 */}
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Welcome back! Here's what's happening with your projects today.
                    </Typography>
                </Box>

                {/* Summary Cards */}
                <DsGrid container spacing={3}>
                    <DsGrid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SummaryCard
                            title="Total Revenue"
                            value="$45,280"
                            change={12.5}
                            icon={<AttachMoneyIcon />}
                            color={theme.palette.primary.main}
                        />
                    </DsGrid>
                    <DsGrid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SummaryCard
                            title="Total Users"
                            value="8,549"
                            change={8.2}
                            icon={<PeopleIcon />}
                            color={theme.palette.success.main}
                        />
                    </DsGrid>
                    <DsGrid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SummaryCard
                            title="Total Orders"
                            value="1,423"
                            change={-3.1}
                            icon={<ShoppingCartIcon />}
                            color={theme.palette.warning.main}
                        />
                    </DsGrid>
                    <DsGrid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SummaryCard
                            title="Conversion Rate"
                            value="3.24%"
                            change={5.7}
                            icon={<AssessmentIcon />}
                            color={theme.palette.info.main}
                        />
                    </DsGrid>
                </DsGrid>

                {/* Charts Row */}
                <DsGrid container spacing={3}>
                    {/* Revenue Chart */}
                    <DsGrid size={{ xs: 12, lg: 8 }}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" component="h2" gutterBottom fontWeight="medium">
                                Revenue Overview
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Monthly revenue comparison between 2023 and 2024
                            </Typography>
                            <Box sx={{ width: '100%', height: 300 }}>
                                <BarChart
                                    xAxis={revenueData.xAxis}
                                    series={revenueData.series}
                                    height={300}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>

                    {/* Sales by Category */}
                    <DsGrid size={{ xs: 12, lg: 4 }}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" component="h2" gutterBottom fontWeight="medium">
                                Sales by Category
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Distribution of sales across categories
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                                <PieChart
                                    series={[
                                        {
                                            data: salesByCategory,
                                            innerRadius: 60,
                                            outerRadius: 100,
                                            paddingAngle: 2,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    height={300}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>
                </DsGrid>

                {/* Second Charts Row */}
                <DsGrid container spacing={3}>
                    {/* User Activity */}
                    <DsGrid size={{ xs: 12, md: 8 }}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" component="h2" gutterBottom fontWeight="medium">
                                User Activity
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Daily active users for the past week
                            </Typography>
                            <Box sx={{ width: '100%', height: 250 }}>
                                <LineChart
                                    xAxis={userActivityData.xAxis}
                                    series={userActivityData.series}
                                    height={250}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>

                    {/* Performance Gauge */}
                    <DsGrid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" component="h2" gutterBottom fontWeight="medium">
                                Overall Performance
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Current system performance score
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 250 }}>
                                <Gauge
                                    value={78}
                                    startAngle={-110}
                                    endAngle={110}
                                    height={250}
                                    sx={{
                                        [`& .${gaugeClasses.valueText}`]: {
                                            fontSize: 32,
                                            fontWeight: 'bold',
                                        },
                                        [`& .${gaugeClasses.valueArc}`]: {
                                            fill: theme.palette.primary.main,
                                        },
                                    }}
                                    text={({ value }) => `${value}%`}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>
                </DsGrid>

                {/* Projects Section */}
                <DsGrid container spacing={3}>
                    <DsGrid size={{ xs: 12 }}>
                        <Paper sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box>
                                    <Typography variant="h6" component="h2" fontWeight="medium">
                                        Active Projects
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Track progress of your ongoing projects
                                    </Typography>
                                </Box>
                                <Chip label={`${projects.length} Projects`} color="primary" />
                            </Box>
                            <DsGrid container spacing={2}>
                                {projects.map((project, index) => (
                                    <DsGrid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                                        <ProjectCard {...project} />
                                    </DsGrid>
                                ))}
                            </DsGrid>
                        </Paper>
                    </DsGrid>
                </DsGrid>

                {/* Quick Stats */}
                <DsGrid container spacing={3}>
                    <DsGrid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Average Response Time
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                1.2s
                            </Typography>
                            <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 6, borderRadius: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                85% faster than last month
                            </Typography>
                        </Paper>
                    </DsGrid>
                    <DsGrid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Customer Satisfaction
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                4.8/5.0
                            </Typography>
                            <LinearProgress variant="determinate" value={96} color="primary" sx={{ height: 6, borderRadius: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                Based on 1,234 reviews
                            </Typography>
                        </Paper>
                    </DsGrid>
                    <DsGrid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Server Uptime
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                99.9%
                            </Typography>
                            <LinearProgress variant="determinate" value={99.9} color="success" sx={{ height: 6, borderRadius: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                Last 30 days availability
                            </Typography>
                        </Paper>
                    </DsGrid>
                </DsGrid>
            </Stack>
        </Box>
    );
};

export default Dashboard;

import { NextResponse } from 'next/server';
import { createGroupApiClient } from '@/lib/task-sync-client';

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const groupApiClient = createGroupApiClient();
    
    const response = await groupApiClient.post('/createGroup', {
      group: requestBody.group.groupName, // Fixed typo
      description: requestBody.group.description,
      user_id: requestBody.user_id,
    });
    
    if (!response) {
      return NextResponse.json({ success: false, message: 'Failed to create group' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Group Saved' });
  } catch (error) {
    console.error("Internal server error", error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const groupApiClient = createGroupApiClient();
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const response = await groupApiClient.get(`/getGroupID/${userId}`);
    
    if (Array.isArray(response.data)) {
      const formattedGroups = response.data.map(group => ({
        id: group.id,
        groupName: group.group || '',
        description: group.description || '',
      }));
      return NextResponse.json(formattedGroups);
    } else {
      // Consistent format for single group
      return NextResponse.json([{
        id: response.data.id || null,
        groupName: response.data.group || '',
        description: response.data.description || '',
      }]);
    }
  } catch (error) {
    console.error("Error fetching groups", error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Send, User } from "lucide-react";
import { apiRequest } from "../lib/queryClient";

interface CommentsSectionProps {
  listingId: string;
  listingType: 'listing' | 'realestate' | 'auction' | 'business';
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

export default function CommentsSection({ listingId, listingType, isOpen, onClose }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ['/api/comments', listingType, listingId],
    enabled: isOpen,
  });

  const addCommentMutation = useMutation({
    mutationFn: async (commentData: { listingId: string; listingType: string; username: string; content: string }) => {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) throw new Error('Failed to post comment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/comments', listingType, listingId] });
      setNewComment("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) return;

    addCommentMutation.mutate({
      listingId,
      listingType,
      username: username.trim(),
      content: newComment.trim(),
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <MessageSquare size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
            <span className="text-sm text-gray-500">({comments.length})</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Comments List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare size={32} className="mx-auto mb-2 text-gray-300" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment: Comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">{comment.username}</span>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Form */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div className="flex space-x-2">
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                rows={2}
                required
              />
              <button
                type="submit"
                disabled={addCommentMutation.isPending || !newComment.trim() || !username.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Send size={16} />
                <span className="hidden sm:inline">Post</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
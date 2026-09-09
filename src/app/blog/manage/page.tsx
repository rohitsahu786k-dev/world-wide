'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getWpMedia } from '@/lib/wp-media';
import {
  Sparkles,
  Plus,
  Trash2 as Trash,
  Pencil,
  Eye,
  Check,
  X,
  ArrowLeft,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  href: string;
  date: string;
  status: string;
  author: string;
}

export default function BlogManagePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'publish' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    status: 'publish' as 'publish' | 'draft',
    image: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs?per_page=100');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err: any) {
      console.error('Failed to load posts:', err);
      showMessage('Failed to load posts from WordPress API', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      status: 'publish',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.description,
      content: post.content,
      status: post.status === 'publish' ? 'publish' : 'draft',
      image: post.image,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showMessage('Please provide both Title and Content', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingPost) {
        // Update
        const res = await fetch(`/api/blogs/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            status: formData.status,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to update post');
        }
        showMessage(`Article #${editingPost.id} updated successfully!`, 'success');
      } else {
        // Create
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            status: formData.status,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to create post');
        }
        showMessage('New article published to WordPress!', 'success');
      }

      setIsModalOpen(false);
      await fetchPosts();
    } catch (err: any) {
      console.error(err);
      showMessage(err.message || 'Action failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Are you sure you want to permanently delete article #${id} from WordPress?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete post');
      }
      showMessage(`Article #${id} deleted from WordPress`, 'success');
      await fetchPosts();
    } catch (err: any) {
      console.error(err);
      showMessage(err.message || 'Failed to delete post', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedCount = posts.filter((p) => p.status === 'publish').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-[#F7FAFC] pt-24 pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#123A5A]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#207B68]">
                <Link href="/blog" className="inline-flex items-center gap-1 hover:text-[#123A5A] transition">
                  <ArrowLeft className="size-3.5" />
                  Public Insights
                </Link>
                <span>•</span>
                <span>WordPress CRUD Management</span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#102033] font-serif">
                WordPress Blog & Insights Control Center
              </h1>
              <p className="mt-1 text-sm text-[#102033]/65">
                Connected to <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-[#123A5A]">aquamarine-herring-353942.hostingersite.com</code>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchPosts}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-[#123A5A]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#123A5A] shadow-sm hover:bg-slate-50 transition"
                title="Refresh from WordPress"
              >
                <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 rounded-xl bg-[#207B68] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#207B68]/25 hover:bg-[#1a6656] transition"
              >
                <Plus className="size-4" />
                New Article
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-[#123A5A]/10 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#102033]/60">Total Articles</p>
              <p className="mt-1 text-2xl font-bold text-[#123A5A]">{posts.length}</p>
            </div>
            <div className="rounded-xl border border-[#207B68]/20 bg-[#207B68]/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#207B68]">Published</p>
              <p className="mt-1 text-2xl font-bold text-[#207B68]">{publishedCount}</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Drafts</p>
              <p className="mt-1 text-2xl font-bold text-amber-800">{draftCount}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">REST API Status</p>
              <div className="mt-1 flex items-center gap-1.5 text-emerald-700 text-sm font-semibold">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Connected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Toast Notification */}
        {message && (
          <div
            className={`mb-6 rounded-xl border p-4 text-sm font-medium transition-all ${
              message.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#123A5A]/10 bg-white p-4 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#102033]/40" />
            <input
              type="text"
              placeholder="Search articles by title or excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#123A5A]/15 bg-slate-50/50 pl-10 pr-4 py-2 text-sm text-[#102033] outline-none focus:border-[#207B68] focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-[#102033]/60 mr-1">Status:</span>
            {(['all', 'publish', 'draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  statusFilter === st
                    ? 'bg-[#123A5A] text-white shadow-sm'
                    : 'bg-slate-100 text-[#102033]/70 hover:bg-slate-200'
                }`}
              >
                {st === 'publish' ? 'Published' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#123A5A]/10 bg-white shadow-sm">
          {loading ? (
            <div className="py-20 text-center text-[#102033]/60">
              <RefreshCw className="mx-auto size-8 animate-spin text-[#207B68]" />
              <p className="mt-3 text-sm font-medium">Fetching articles from WordPress backend...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold text-[#123A5A]">No articles match your criteria</h3>
              <p className="mt-1 text-sm text-[#102033]/60">Try clearing filters or click &apos;New Article&apos; to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#102033]">
                <thead className="border-b border-[#123A5A]/10 bg-slate-50 text-xs uppercase tracking-wider text-[#102033]/60">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Article</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Author</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#123A5A]/10">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-[#123A5A]/10">
                            <img
                              src={getWpMedia(post.image)}
                              alt={post.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="max-w-md">
                            <Link
                              href={`/blog/${post.id}`}
                              className="font-semibold text-[#123A5A] hover:text-[#207B68] transition line-clamp-1"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-[#102033]/60 line-clamp-1 mt-0.5">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-[#207B68]/10 px-2.5 py-0.5 text-xs font-semibold text-[#207B68] border border-[#207B68]/20">
                          {post.category || 'Blog'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            post.status === 'publish'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {post.status === 'publish' ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-xs text-[#102033]/70">
                        {post.author}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-xs text-[#102033]/70">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/blog/${post.id}`}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#123A5A] transition"
                            title="View public page"
                          >
                            <ExternalLink className="size-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="rounded-lg p-1.5 text-[#207B68] hover:bg-[#207B68]/10 transition"
                            title="Edit article"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                            className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition"
                            title="Delete article"
                          >
                            <Trash className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create / Edit Article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102033]/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl border border-[#123A5A]/10 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#123A5A]/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#102033] font-serif">
                  {editingPost ? `Edit Article #${editingPost.id}` : 'Create New Article'}
                </h3>
                <p className="text-xs text-[#102033]/60 mt-0.5">
                  Synchronizes directly with WordPress REST API
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#123A5A]">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Cross-Border Luxury Fragrance Distribution in 2026"
                  className="mt-1.5 w-full rounded-xl border border-[#123A5A]/20 p-3 text-sm text-[#102033] outline-none focus:border-[#207B68] focus:ring-1 focus:ring-[#207B68]"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#123A5A]">
                  Excerpt / Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise overview or preview summary of the insight..."
                  className="mt-1.5 w-full rounded-xl border border-[#123A5A]/20 p-3 text-sm text-[#102033] outline-none focus:border-[#207B68] focus:ring-1 focus:ring-[#207B68]"
                />
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#123A5A]">
                  Article Content (HTML or Plain Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<p>Full article text with paragraphs, headings, and lists...</p>"
                  className="mt-1.5 w-full rounded-xl border border-[#123A5A]/20 p-3 font-mono text-xs text-[#102033] outline-none focus:border-[#207B68] focus:ring-1 focus:ring-[#207B68]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#123A5A]">
                  Publication Status
                </label>
                <div className="mt-1.5 flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-[#102033] cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="publish"
                      checked={formData.status === 'publish'}
                      onChange={() => setFormData({ ...formData, status: 'publish' })}
                      className="text-[#207B68] focus:ring-[#207B68]"
                    />
                    <span className="font-medium text-emerald-700">Published (Live)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#102033] cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                      className="text-[#207B68] focus:ring-[#207B68]"
                    />
                    <span className="font-medium text-amber-700">Draft (Unlisted)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#123A5A]/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-[#123A5A]/20 px-5 py-2.5 text-sm font-semibold text-[#123A5A] hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#207B68] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#207B68]/20 hover:bg-[#1a6656] transition disabled:opacity-50"
                >
                  {saving && <RefreshCw className="size-4 animate-spin" />}
                  {editingPost ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

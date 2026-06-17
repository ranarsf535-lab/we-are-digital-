from django.contrib import admin
from .models import ChatSession, ChatMessage

class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    fields = ['role', 'content', 'created_at']
    readonly_fields = ['role', 'content', 'created_at']
    can_delete = False
    extra = 0

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'lead_captured', 'lead_name', 'lead_email', 'created_at']
    list_filter = ['lead_captured', 'created_at']
    search_fields = ['session_id', 'lead_name', 'lead_email']
    inlines = [ChatMessageInline]

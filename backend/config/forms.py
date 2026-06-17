from django import forms
from django.contrib.admin.forms import AdminAuthenticationForm

class NoAutofillAdminAuthForm(AdminAuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'autocomplete': 'off',
            'autocorrect': 'off',
            'autocapitalize': 'off',
            'spellcheck': 'false',
        })
        self.fields['password'].widget.attrs.update({
            'autocomplete': 'new-password',
        })

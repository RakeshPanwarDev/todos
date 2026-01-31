import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  imports: [],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.css',
})
export class ColorPicker {
  selectedColor = signal('#000000');

  updateColor(newColor: string) {
    this.selectedColor.set(newColor);
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.selectedColor());
    alert('Color code copied to clipboard: ' + this.selectedColor());
  }
}

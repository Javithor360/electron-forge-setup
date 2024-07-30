import Quill from 'quill';

// Creating a custom Blot for the mention (maybe this could be defined outside)
class MentionBlot extends (Quill.import('blots/inline') as any) {
    static create(value: any) {
        const node = super.create() as HTMLElement;
        node.setAttribute('data-props', JSON.stringify(value)); // Store the custom data in the element
        node.setAttribute('class', 'mention-highlight'); // Add a class for unique styling
        node.setAttribute('contenteditable', 'false'); // Avoid edit content
        node.textContent = value.content; // Set the text content
        node.setAttribute('tabindex', '0');
        return node;
    }

    static formats(node: HTMLElement) {
        const data = node.getAttribute('data-props'); // Retrieve the custom data from the element
        return data ? JSON.parse(data) : {};
    }
}

MentionBlot.blotName = 'mention'; // Define the name of the custom blot
MentionBlot.tagName = 'span'; // Define the tag name for the custom blot

export default MentionBlot;

import { ref } from 'vue';
export function useTags(initialTags: string[] = []) {
  const inputTag = ref<string>('');
  const tags = ref<string[]>([...initialTags]);
  const crossTagLeft = ref<string>('');
  const crossTagRight = ref<string>('');

  function addTag() {
    const value = inputTag.value;
    if (!value) return;
    tags.value.push(value);
    inputTag.value = '';
  }

  function removeTag(index: number) {
    if (index < 0 || index >= tags.value.length) return;
    tags.value.splice(index, 1);
  }

  function addCrossTag() {
    if (crossTagLeft.value && crossTagRight.value) {
      tags.value.push(crossTagLeft.value + ' x ' + crossTagRight.value);
      crossTagLeft.value = '';
      crossTagRight.value = '';
    }
  }

  return {
    inputTag,
    tags,
    crossTagLeft,
    crossTagRight,
    addTag,
    removeTag,
    addCrossTag,
  };
}

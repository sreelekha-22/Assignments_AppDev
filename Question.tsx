export default interface Question {
    id: string;
    text: string;
    type: string;
    required: boolean;
    min?: string;
    max?: string;
    optionsList?: string[];
  }

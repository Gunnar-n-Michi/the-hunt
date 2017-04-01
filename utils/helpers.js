export function conditionalRender(condition, content) {
  console.log ("In conditional render")
    if (condition) {
        return content;
    } else {
        return null;
    }
}

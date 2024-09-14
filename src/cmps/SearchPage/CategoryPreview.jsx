export function CategoryPreview({ category, onCategoryClick }) {
  return (
    <div
      key={category.id}
      className="category-card"
      onClick={() => onCategoryClick(category)}
    >
      <img src={category.icons[0].url} alt={category.name} />
      <h3>{category.name}</h3>
    </div>
  )
}

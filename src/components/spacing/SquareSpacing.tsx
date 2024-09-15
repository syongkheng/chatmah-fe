import { SpacingSize } from "./SquareSpacing.enum"


interface ISquareSpacing {
    spacing: SpacingSize
}

const SquareSpacing = (props: ISquareSpacing) => {
    return (
        <div style={{ width: props.spacing, height: props.spacing }}></div>
    )
}

export default SquareSpacing
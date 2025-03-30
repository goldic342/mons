from fastapi import APIRouter, HTTPException, Depends
from src.auth.dependencies import get_current_user
from src.abilities import service
from src.abilities.schemas import AbilityCreate, AbilityUpdate

router = APIRouter(
    prefix="/abilities", tags=["abilities"], dependencies=[Depends(get_current_user)]
)


@router.post("/")
def create_ability(
    payload: AbilityCreate,
):
    id = service.create_ability(payload.name, payload.description)
    return {"id": id}


@router.get("/")
def get_abilities():
    return service.get_all_abilities()


@router.get("/{ability_id}")
def get_ability(
    ability_id: int,
):
    ability = service.get_ability(ability_id)
    if not ability:
        raise HTTPException(status_code=404, detail="Ability not found")
    return ability


@router.put("/{ability_id}")
def update_ability(
    ability_id: int,
    payload: AbilityUpdate,
):
    if not service.get_ability(ability_id):
        raise HTTPException(status_code=404, detail="Ability not found")

    service.update_ability(
        ability_id, name=payload.name, description=payload.description
    )
    return {"id": ability_id}


@router.delete("/{ability_id}")
def delete_ability(
    ability_id: int,
):
    if not service.get_ability(ability_id):
        raise HTTPException(status_code=404, detail="Ability not found")
    service.delete_ability(ability_id)
    return {"message": f"Ability {ability_id} deleted"}

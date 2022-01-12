import { User, UserStore } from '../../models/user'

const store = new UserStore()
const users = [
  {
    user_name: 'Admin',
    first_name: 'Marwan',
    last_name: 'Ashour',
  },
  {
    user_name: 'Boss',
    first_name: 'Hassan',
    last_name: 'Ali',
  },
]

describe('User Model', () => {
  const user: User = {
    user_name: users[1].user_name,
    first_name: users[1].first_name,
    last_name: users[1].last_name,
    user_password: 'boss_password'
  }

  it('should contain create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should add user through create method ', async () => {
    const result = await store.create(user)
    expect(result).toBeTruthy
  })

  it('should contain index method', () => {
    expect(store.index).toBeDefined()
  })

  it('index method should return the entire list of users', async () => {
    const result = await store.index()
         const uzr = jasmine.objectContaining(users[1])
    expect(result).toContain(uzr)
  })

  it('should contain show method', () => {
    expect(store.show).toBeDefined()
  })

  it('show method should return the selected user', async () => {
    const result = await store.show(3)
        const uzr = jasmine.objectContaining(users[1])
    expect(result).toEqual(uzr)
  })

  it('should contain authenticate method', () => {
    expect(store.authenticate).toBeDefined()
  })

  it('authenticate method should confirm the user existence', async () => {
    const result = await store.authenticate(user.user_name, user.user_password)
    expect(result).not.toBeNull
  })
})